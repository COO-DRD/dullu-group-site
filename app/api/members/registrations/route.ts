import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ ids: [] });

  const res = await fetch(
    `${SUPA}/rest/v1/dr_dullu_registrations?user_id=eq.${session.id}&select=content_id`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, next: { revalidate: 30 } }
  );
  if (!res.ok) return NextResponse.json({ ids: [] });

  const rows = await res.json() as { content_id: string }[];
  return NextResponse.json({ ids: rows.map((r) => r.content_id) });
}
