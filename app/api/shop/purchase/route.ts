import { NextRequest, NextResponse } from "next/server";

const SUPA_URL = process.env.SUPABASE_URL!;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { user_email, product_slug, product_id } = await req.json() as {
      user_email: string;
      product_slug: string;
      product_id?: string;
    };

    if (!user_email || !product_slug) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await fetch(`${SUPA_URL}/rest/v1/purchases`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
        "Prefer":        "return=minimal",
      },
      body: JSON.stringify({ user_email, product_slug, product_id: product_id ?? null }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
