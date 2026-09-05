import { NextRequest, NextResponse } from "next/server";

// Records analytics events fired by the homepage (lib/analytics.ts track()).
// TODO: create the `site_events` table in Supabase before relying on reports.
//   create table if not exists site_events (
//     id    bigint generated always as identity primary key,
//     name  text not null,
//     props jsonb not null default '{}'::jsonb,
//     url   text,
//     ts    timestamptz not null default now()
//   );
//   create index if not exists idx_site_events_name_ts on site_events (name, ts);

const SUPA_URL = process.env.SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY;

export async function POST(req: NextRequest) {
  // Fire-and-forget: never fail the page because analytics misbehaves.
  try {
    const body = await req.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.slice(0, 120) : null;
    if (!name) {
      return NextResponse.json({ ok: true }, { status: 204 });
    }
    const props = body.props && typeof body.props === "object" ? body.props : {};
    const url = typeof body.url === "string" ? body.url.slice(0, 1000) : null;
    const ts = typeof body.ts === "string" ? body.ts : new Date().toISOString();

    if (SUPA_URL && SUPA_KEY) {
      await fetch(`${SUPA_URL}/rest/v1/site_events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPA_KEY,
          Authorization: `Bearer ${SUPA_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ name, props, url, ts }),
      }).catch((e) => console.error("[track] insert failed:", e));
    }
  } catch (err) {
    console.error("[track]", err);
  }
  return NextResponse.json({ ok: true }, { status: 204 });
}