import { NextRequest, NextResponse } from "next/server";

const SUPA   = process.env.SUPABASE_URL!;
const KEY    = process.env.SUPABASE_SERVICE_KEY!;
const SECRET = process.env.CONTENT_ADMIN_SECRET!;

function auth(req: NextRequest) {
  const s = req.headers.get("x-admin-secret") ?? "";
  return s === SECRET && !!SECRET;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentId = new URL(req.url).searchParams.get("contentId");
  if (!contentId) return NextResponse.json({ error: "contentId required" }, { status: 400 });

  const res = await fetch(
    `${SUPA}/rest/v1/dr_dullu_registrations?content_id=eq.${contentId}&select=id,registered_at,user_id,dr_dullu_site_users(name,email,phone)&order=registered_at.desc`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }
  );

  if (!res.ok) return NextResponse.json({ error: "Query failed" }, { status: 500 });
  const rows = await res.json() as {
    id: string;
    registered_at: string;
    user_id: string;
    dr_dullu_site_users: { name: string; email: string; phone: string | null };
  }[];

  const registrations = rows.map((r) => ({
    id:           r.id,
    registeredAt: r.registered_at,
    name:         r.dr_dullu_site_users?.name ?? "—",
    email:        r.dr_dullu_site_users?.email ?? "—",
    phone:        r.dr_dullu_site_users?.phone ?? null,
  }));

  return NextResponse.json({ registrations });
}
