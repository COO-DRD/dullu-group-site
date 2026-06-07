import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const WORKER = "https://dullu-shop-api.dr-dullu.workers.dev";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await fetch(
    `${WORKER}/api/my-orders?email=${encodeURIComponent(session.email)}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) return NextResponse.json({ orders: [] });
  const data = await res.json() as { orders: unknown[] };
  return NextResponse.json({ orders: data.orders ?? [] });
}
