import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;

function supaFetch(table: string, params: string) {
  return fetch(`${SUPA}/rest/v1/${table}?${params}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    next: { revalidate: 60 },
  }).then((r) => r.json());
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [workshops, events, announcements, releases] = await Promise.all([
    supaFetch("dr_dullu_workshops",    "is_published=eq.true&order=created_at.desc&limit=12"),
    supaFetch("dr_dullu_events",       "is_published=eq.true&order=starts_at.asc&limit=8"),
    supaFetch("dr_dullu_announcements","is_published=eq.true&order=created_at.desc&limit=6"),
    supaFetch("dr_dullu_releases",     "is_published=eq.true&order=created_at.desc&limit=8"),
  ]);

  return NextResponse.json({ workshops, events, announcements, releases });
}
