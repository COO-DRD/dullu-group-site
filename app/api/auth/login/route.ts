import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, verifyPassword } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL;
const KEY  = process.env.SUPABASE_SERVICE_KEY;

async function findUser(email: string) {
  const res = await fetch(
    `${SUPA}/rest/v1/site_users?email=eq.${encodeURIComponent(email)}&select=id,email,name,password_hash,onboarded&limit=1`,
    { headers: { apikey: KEY!, Authorization: `Bearer ${KEY}` } }
  );
  if (!res.ok) throw new Error("DB_ERROR");
  const rows = await res.json();
  return rows[0] as { id: string; email: string; name: string; password_hash: string; onboarded: boolean } | undefined;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await findUser(email.toLowerCase().trim());
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createSessionCookie({ id: user.id, email: user.email, name: user.name, onboarded: user.onboarded });

    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, onboarded: user.onboarded } });
  } catch (err) {
    console.error("[login]", err);
    return NextResponse.json({ error: "Login failed. Try again." }, { status: 500 });
  }
}
