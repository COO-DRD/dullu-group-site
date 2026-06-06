import { NextRequest, NextResponse } from "next/server";
import { getSession, createSessionCookie } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL;
const KEY  = process.env.SUPABASE_SERVICE_KEY;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { persona, pain_point, phone } = await req.json();

  await fetch(`${SUPA}/rest/v1/dr_dullu_site_users?id=eq.${session.id}`, {
    method:  "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey:         KEY!,
      Authorization:  `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      persona,
      pain_point,
      onboarded: true,
      ...(phone ? { phone: phone.trim() } : {}),
    }),
  });

  await createSessionCookie({ ...session, onboarded: true });

  return NextResponse.json({ ok: true });
}
