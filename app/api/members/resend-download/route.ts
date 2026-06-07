import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const WORKER = "https://dullu-shop-api.dr-dullu.workers.dev";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderId } = await req.json() as { orderId: string };
  if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  const res = await fetch(`${WORKER}/api/resend-download`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ email: session.email, orderId }),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
