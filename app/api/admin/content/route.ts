import { NextRequest, NextResponse } from "next/server";

const SUPA   = process.env.SUPABASE_URL!;
const KEY    = process.env.SUPABASE_SERVICE_KEY!;
const SECRET = process.env.CONTENT_ADMIN_SECRET!;

const TABLES: Record<string, string> = {
  workshops:     "dr_dullu_workshops",
  events:        "dr_dullu_events",
  announcements: "dr_dullu_announcements",
  releases:      "dr_dullu_releases",
};

function auth(req: NextRequest) {
  const s = req.headers.get("x-admin-secret") ?? "";
  return s === SECRET && !!SECRET;
}

function supa(path: string, init?: RequestInit) {
  return fetch(`${SUPA}/rest/v1/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey:         KEY,
      Authorization:  `Bearer ${KEY}`,
      Prefer:         "return=representation",
      ...(init?.headers as Record<string, string> ?? {}),
    },
  });
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const type = new URL(req.url).searchParams.get("type") ?? "";
  const table = TABLES[type];
  if (!table) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  const res = await supa(`${table}?order=created_at.desc`);
  return NextResponse.json(await res.json(), { status: res.ok ? 200 : 500 });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const type = new URL(req.url).searchParams.get("type") ?? "";
  const table = TABLES[type];
  if (!table) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  const body = await req.json();
  const res  = await supa(table, { method: "POST", body: JSON.stringify(body) });
  const data = await res.json();
  return NextResponse.json(Array.isArray(data) ? data[0] : data, { status: res.ok ? 201 : 500 });
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url   = new URL(req.url);
  const type  = url.searchParams.get("type") ?? "";
  const id    = url.searchParams.get("id") ?? "";
  const table = TABLES[type];
  if (!table || !id) return NextResponse.json({ error: "Invalid type or id" }, { status: 400 });
  const body = await req.json();
  const res  = await supa(`${table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(body) });
  const data = await res.json();
  return NextResponse.json(Array.isArray(data) ? data[0] : data, { status: res.ok ? 200 : 500 });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url   = new URL(req.url);
  const type  = url.searchParams.get("type") ?? "";
  const id    = url.searchParams.get("id") ?? "";
  const table = TABLES[type];
  if (!table || !id) return NextResponse.json({ error: "Invalid type or id" }, { status: 400 });
  const res = await supa(`${table}?id=eq.${id}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
  return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 500 });
}
