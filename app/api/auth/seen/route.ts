import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;

export async function PATCH() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await fetch(`${SUPA}/rest/v1/dr_dullu_site_users?id=eq.${session.id}`, {
    method:  "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey:         KEY,
      Authorization:  `Bearer ${KEY}`,
    },
    body: JSON.stringify({ last_seen_at: new Date().toISOString() }),
  });

  return NextResponse.json({ ok: true });
}
