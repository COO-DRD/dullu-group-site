import { NextRequest, NextResponse } from "next/server";

const SUPA_URL = process.env.SUPABASE_URL!;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { email, name, source } = await req.json() as {
      email: string;
      name?: string;
      source?: string;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const res = await fetch(`${SUPA_URL}/rest/v1/email_subscribers`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
        "Prefer":        "return=minimal,resolution=ignore-duplicates",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        name:  name?.trim() ?? null,
        source: source ?? "homepage",
      }),
    });

    // 409 = duplicate (already subscribed) — treat as success
    if (!res.ok && res.status !== 409) {
      return NextResponse.json({ error: "Could not subscribe. Try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Network error." }, { status: 500 });
  }
}
