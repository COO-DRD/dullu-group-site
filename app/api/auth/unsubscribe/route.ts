import { NextRequest, NextResponse } from "next/server";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({}));
  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Invalid token." }, { status: 400 });
  }

  const res = await fetch(
    `${SUPA}/rest/v1/dr_dullu_site_users?unsubscribe_token=eq.${encodeURIComponent(token)}&select=id&limit=1`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }
  );
  const [user] = await res.json() as [{ id: string }?];

  if (!user) {
    return NextResponse.json({ error: "Invalid unsubscribe link." }, { status: 400 });
  }

  await fetch(`${SUPA}/rest/v1/dr_dullu_site_users?id=eq.${user.id}`, {
    method:  "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey:         KEY,
      Authorization:  `Bearer ${KEY}`,
    },
    body: JSON.stringify({ digest_opted_out: true }),
  });

  return NextResponse.json({ ok: true });
}
