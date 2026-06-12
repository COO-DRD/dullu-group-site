import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { goodwillThankYouHtml, goodwillThankYouSubject } from "@/lib/email-templates";

const SUPA_URL     = process.env.SUPABASE_URL!;
const SUPA_KEY     = process.env.SUPABASE_SERVICE_KEY!;
const SHOP_SECRET  = process.env.SHOP_ADMIN_SECRET!;
const SHOP_VERIFY  = "https://dullu-shop-api.dullugroup.co.ke/api/internal/paypal/verify-goodwill";

interface VerifyResult {
  valid: boolean;
  payer: { email: string; name: string } | null;
  txId: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const event   = JSON.parse(rawBody) as { event_type?: string };

    if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
      return NextResponse.json({ ok: true });
    }

    // Forward to shop worker for PayPal credential-based verification
    const verifyRes = await fetch(SHOP_VERIFY, {
      method: "POST",
      headers: {
        "content-type":             "application/json",
        "x-internal-secret":         SHOP_SECRET,
        "paypal-auth-algo":          req.headers.get("paypal-auth-algo")         ?? "",
        "paypal-cert-url":           req.headers.get("paypal-cert-url")          ?? "",
        "paypal-transmission-id":    req.headers.get("paypal-transmission-id")   ?? "",
        "paypal-transmission-sig":   req.headers.get("paypal-transmission-sig")  ?? "",
        "paypal-transmission-time":  req.headers.get("paypal-transmission-time") ?? "",
      },
      body: rawBody,
    });

    const { valid, payer, txId } = await verifyRes.json() as VerifyResult;

    if (!valid || !payer?.email) {
      return NextResponse.json({ ok: true });
    }

    const res = await fetch(`${SUPA_URL}/rest/v1/goodwill_supporters`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
        "Prefer":        "return=minimal,resolution=ignore-duplicates",
      },
      body: JSON.stringify({ name: payer.name, email: payer.email, method: "paypal", paypal_tx_id: txId }),
    });

    if (res.status !== 409) {
      try {
        await sendEmail({
          to:      payer.email,
          subject: goodwillThankYouSubject,
          html:    goodwillThankYouHtml(payer.name),
        });
      } catch (err) {
        console.error("[goodwill/paypal] thank-you email failed:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[goodwill/paypal] error:", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
