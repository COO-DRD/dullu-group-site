import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;

function supaCheck(table: string, since: string) {
  const qs = `is_published=eq.true&created_at=gt.${encodeURIComponent(since)}&limit=1&select=id`;
  return fetch(`${SUPA}/rest/v1/${table}?${qs}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    next: { revalidate: 120 },
  }).then((r) => r.json()).then((rows: unknown[]) => rows.length > 0);
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ hasNew: false });

  // Fetch last_seen_at from DB (not in session cookie)
  const userRes = await fetch(
    `${SUPA}/rest/v1/dr_dullu_site_users?id=eq.${session.id}&select=last_seen_at&limit=1`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, next: { revalidate: 60 } }
  );
  const [user] = await userRes.json() as [{ last_seen_at: string | null }?];
  const since  = user?.last_seen_at ?? "1970-01-01T00:00:00Z";

  const [w, e, a, r] = await Promise.all([
    supaCheck("dr_dullu_workshops",     since),
    supaCheck("dr_dullu_events",        since),
    supaCheck("dr_dullu_announcements", since),
    supaCheck("dr_dullu_releases",      since),
  ]);

  return NextResponse.json({ hasNew: w || e || a || r });
}
