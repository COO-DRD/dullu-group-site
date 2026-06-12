import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { goodwillFollowUpHtml, goodwillFollowUpSubject } from "@/lib/email-templates";

const SUPA_URL    = process.env.SUPABASE_URL!;
const SUPA_KEY    = process.env.SUPABASE_SERVICE_KEY!;
const CRON_SECRET = process.env.CRON_SECRET;

interface Supporter { id: string; name: string; email: string }

export async function GET(req: NextRequest) {
  if (CRON_SECRET && req.headers.get("authorization") !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  const res = await fetch(
    `${SUPA_URL}/rest/v1/goodwill_supporters?followup_sent_at=is.null&created_at=lte.${threeDaysAgo}&select=id,name,email`,
    { headers: { "apikey": SUPA_KEY, "Authorization": `Bearer ${SUPA_KEY}` } }
  );

  if (!res.ok) return NextResponse.json({ error: "DB error." }, { status: 500 });

  const supporters: Supporter[] = await res.json();
  let sent = 0;

  for (const s of supporters) {
    try {
      await sendEmail({
        to:      s.email,
        subject: goodwillFollowUpSubject,
        html:    goodwillFollowUpHtml(s.name),
      });

      await fetch(`${SUPA_URL}/rest/v1/goodwill_supporters?id=eq.${s.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":  "application/json",
          "apikey":        SUPA_KEY,
          "Authorization": `Bearer ${SUPA_KEY}`,
        },
        body: JSON.stringify({ followup_sent_at: new Date().toISOString() }),
      });

      sent++;
    } catch (err) {
      console.error(`[goodwill-followup] failed for ${s.email}:`, err);
    }
  }

  return NextResponse.json({ sent, total: supporters.length });
}
