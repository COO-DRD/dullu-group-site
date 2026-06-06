import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { weeklyDigestHtml, weeklyDigestSubject, type DigestData } from "@/lib/email-templates";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;

function supaFetch(table: string, params: string) {
  return fetch(`${SUPA}/rest/v1/${table}?${params}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    cache: "no-store",
  }).then((r) => r.json());
}

export async function GET(req: NextRequest) {
  // Verify Vercel cron secret
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Fetch all members + new content in parallel
  const [users, workshops, events, announcements, releases] = await Promise.all([
    supaFetch("dr_dullu_site_users", "select=name,email&order=created_at.asc"),
    supaFetch("dr_dullu_workshops",     `is_published=eq.true&created_at=gt.${since}&select=title,description&order=created_at.desc`),
    supaFetch("dr_dullu_events",        `is_published=eq.true&created_at=gt.${since}&select=title,starts_at,location&order=starts_at.asc`),
    supaFetch("dr_dullu_announcements", `is_published=eq.true&created_at=gt.${since}&select=title,body&order=created_at.desc`),
    supaFetch("dr_dullu_releases",      `is_published=eq.true&created_at=gt.${since}&select=title,description,version&order=created_at.desc`),
  ]);

  const total = workshops.length + events.length + announcements.length + releases.length;

  if (total === 0) {
    return NextResponse.json({ ok: true, message: "No new content — digest skipped", sent: 0 });
  }

  let sent = 0;
  let errors = 0;

  for (const u of users as { name: string; email: string }[]) {
    const data: DigestData = { name: u.name, workshops, events, announcements, releases };
    const html = weeklyDigestHtml(data);
    if (!html) continue;

    try {
      await sendEmail({
        to:      u.email,
        subject: weeklyDigestSubject(total),
        html,
      });
      sent++;
    } catch (err) {
      console.error(`[digest] failed for ${u.email}:`, err);
      errors++;
    }
  }

  return NextResponse.json({ ok: true, sent, errors, contentItems: total });
}
