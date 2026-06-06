"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";
import type { Product } from "@/app/shop/page";
import type { RecProduct } from "@/app/api/shop/recs/[slug]/route";
import { useAuth } from "@/context/AuthContext";

const API         = "https://dullu-shop-api.dullugroup.co.ke";
const PP_CLIENT_ID = "ARYvT3CsPC_QKxiXp9eq8Qe6V9Rs8j1wVuIlfFE5ehtUKew2odPbRiIkJEvArsMCJ1ZvvAKWSyDmbsKR";

type Step      = "form" | "processing" | "polling" | "paypal" | "success" | "error";
type PayMethod = "mpesa" | "paypal";

declare global {
  interface Window {
    paypal?: {
      Buttons: (opts: {
        style?: Record<string, unknown>;
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: unknown) => void;
        onCancel: () => void;
      }) => { render: (el: string | HTMLElement) => Promise<void>; isEligible?: () => boolean };
    };
  }
}

export default function CheckoutModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const isFree       = product.price_kes === 0;
  const { user }     = useAuth();

  const [step, setStep]               = useState<Step>("form");
  const [payMethod, setPayMethod]     = useState<PayMethod>("mpesa");
  const [name, setName]               = useState(user?.name ?? "");
  const [email, setEmail]             = useState(user?.email ?? "");
  const [phone, setPhone]             = useState("");
  const [whatsapp, setWhatsapp]       = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg]       = useState("");
  const [recs, setRecs]               = useState<RecProduct[]>([]);

  const pollRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const ppContRef    = useRef<HTMLDivElement>(null);
  const ppRendered   = useRef(false);
  const ppOrderIdRef = useRef<string | null>(null); // Worker D1 orderId (not PayPal's)

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // Load PayPal SDK and render button when on paypal step
  useEffect(() => {
    if (step !== "paypal" || ppRendered.current) return;

    function renderButton() {
      if (!window.paypal || !ppContRef.current) return;
      ppRendered.current = true;
      window.paypal.Buttons({
        style: { layout: "vertical", color: "gold", shape: "rect", label: "pay", height: 48 },
        createOrder: async () => {
          setStep("processing");
          const res  = await fetch(`${API}/api/checkout`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              productSlug:   product.slug,
              email:         email.trim(),
              name:          name.trim(),
              paymentMethod: "paypal",
              ...(whatsapp.trim() ? { phone: whatsapp.trim() } : {}),
            }),
          });
          const data = await res.json() as { error?: string; orderId?: string; paypalOrderId?: string };
          if (!res.ok || !data.paypalOrderId) throw new Error(data.error || "Checkout failed");
          ppOrderIdRef.current = data.orderId ?? null;
          setStep("paypal");
          return data.paypalOrderId;
        },
        onApprove: async (data) => {
          setStep("processing");
          const res  = await fetch(`${API}/api/paypal/capture-order`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ paypalOrderId: data.orderID, orderId: ppOrderIdRef.current }),
          });
          const result = await res.json() as { error?: string; downloadUrl?: string | null };
          if (!res.ok) {
            setErrorMsg(result.error || "Payment capture failed. Please contact us.");
            setStep("error");
            return;
          }
          setDownloadUrl(result.downloadUrl ?? null);
          recordPurchase(email.trim());
          setStep("success");
        },
        onError: () => {
          setErrorMsg("PayPal encountered an error. Please try again or use M-Pesa.");
          setStep("error");
        },
        onCancel: () => setStep("form"),
      }).render(ppContRef.current!);
    }

    if (window.paypal) {
      renderButton();
    } else {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${PP_CLIENT_ID}&currency=USD&intent=capture&components=buttons&disable-funding=venmo,paylater`;
      script.onload = renderButton;
      script.onerror = () => {
        setErrorMsg("Could not load PayPal. Check your connection and try again.");
        setStep("error");
      };
      document.head.appendChild(script);
    }
  }, [step, product.slug, email, name]);

  function recordPurchase(emailAddr: string) {
    fetch("/api/shop/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email:   emailAddr,
        product_slug: product.slug,
        product_id:   product.id,
      }),
    }).catch(() => {});
    fetch(`/api/shop/recs/${product.slug}`)
      .then((r) => r.json())
      .then(({ recs: r }: { recs: RecProduct[] }) => setRecs(r ?? []))
      .catch(() => {});
  }

  function startPolling(orderId: string) {
    setStep("polling");
    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      try {
        const res  = await fetch(`${API}/api/order/${orderId}`);
        const data = await res.json() as { status: string; downloadUrl: string | null };
        if (data.status === "paid" && data.downloadUrl) {
          clearInterval(pollRef.current!);
          setDownloadUrl(data.downloadUrl);
          recordPurchase(email);
          setStep("success");
        } else if (["failed", "expired", "cancelled"].includes(data.status)) {
          clearInterval(pollRef.current!);
          setErrorMsg("Payment was not completed. Please try again.");
          setStep("error");
        } else if (attempts >= 60) {
          clearInterval(pollRef.current!);
          setErrorMsg("Payment timed out. If you paid, check your email for the download link.");
          setStep("error");
        }
      } catch { /* network blip — keep polling */ }
    }, 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFree && payMethod === "paypal") {
      // Switch to paypal step — the PayPal button handles the rest
      ppRendered.current = false;
      setStep("paypal");
      return;
    }
    setStep("processing");
    setErrorMsg("");
    try {
      const body: Record<string, string> = {
        productSlug:   product.slug,
        email:         email.trim(),
        name:          name.trim(),
        paymentMethod: isFree ? "free" : "mpesa",
      };
      if (!isFree) body.phone = phone.trim();
      if (isFree && whatsapp.trim()) body.phone = whatsapp.trim();

      const res  = await fetch(`${API}/api/checkout`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const data = await res.json() as {
        error?: string; downloadUrl?: string; orderId?: string; alreadyOwned?: boolean;
      };

      if (!res.ok) {
        setErrorMsg(data.alreadyOwned
          ? "You already own this — check your email for the link."
          : (data.error ?? "Checkout failed."));
        setStep("error");
        return;
      }
      if (isFree && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        recordPurchase(email.trim());
        setStep("success");
        return;
      }
      if (data.orderId) startPolling(data.orderId);
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setStep("error");
    }
  }

  const inputCls   = "w-full font-sans text-sm px-4 py-3 border transition-colors focus:outline-none";
  const inputStyle = { borderColor: "#F0EDE8", color: "#111111", backgroundColor: "#FAFAF8" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(17,17,17,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md p-8 relative overflow-y-auto"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0EDE8", maxHeight: "90vh" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl leading-none cursor-pointer transition-colors hover:text-amber"
          style={{ color: "#AAAAAA" }}
          aria-label="Close"
        >
          ×
        </button>

        <p
          className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-2"
          style={{ color: isFree ? "#1B3D8F" : "#D4580A" }}
        >
          {isFree ? "Free Download" : `KES ${product.price_kes.toLocaleString()}`}
        </p>
        <h2 className="font-sans font-bold text-xl leading-snug mb-8 pr-6" style={{ color: "#111111" }}>
          {product.title}
        </h2>

        {/* ── Form ─────────────────────────────────────────────── */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name",     type: "text",  val: name,  set: setName,  placeholder: "Jane Wanjiru" },
              { label: "Email Address", type: "email", val: email, set: setEmail, placeholder: "jane@example.com" },
            ].map(({ label, type, val, set, placeholder }) => (
              <div key={label}>
                <label className="block font-sans text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: "#888888" }}>
                  {label}
                </label>
                <input
                  type={type} required value={val}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className={inputCls} style={inputStyle}
                />
              </div>
            ))}

            {isFree && (
              <div>
                <label className="block font-sans text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: "#888888" }}>
                  WhatsApp Number <span style={{ color: "#CCCCCC", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optional</span>
                </label>
                <input
                  type="tel" value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="07XX XXX XXX"
                  className={inputCls} style={inputStyle}
                />
                <p className="font-sans text-[10px] mt-1.5" style={{ color: "#CCCCCC" }}>
                  Get updates and tips on WhatsApp.
                </p>
              </div>
            )}

            {!isFree && (
              <>
                {/* Payment method tabs */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: "#888888" }}>
                    Payment Method
                  </label>
                  <div className="flex border" style={{ borderColor: "#F0EDE8" }}>
                    {(["mpesa", "paypal"] as PayMethod[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPayMethod(m)}
                        className="flex-1 py-2.5 font-sans text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer"
                        style={{
                          backgroundColor: payMethod === m ? "#D4580A" : "#FAFAF8",
                          color:           payMethod === m ? "#FFFFFF" : "#888888",
                        }}
                      >
                        {m === "mpesa" ? "M-Pesa" : "PayPal"}
                      </button>
                    ))}
                  </div>
                </div>

                {payMethod === "mpesa" && (
                  <div>
                    <label className="block font-sans text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: "#888888" }}>
                      M-Pesa Number
                    </label>
                    <input
                      type="tel" required value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0712 345 678"
                      className={inputCls} style={inputStyle}
                    />
                  </div>
                )}

                {payMethod === "paypal" && (
                  <>
                    <p className="font-sans text-[10px] leading-relaxed" style={{ color: "#AAAAAA" }}>
                      You&apos;ll be taken to PayPal to complete payment. Amount charged in USD.
                    </p>
                    <div>
                      <label className="block font-sans text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: "#888888" }}>
                        WhatsApp Number <span style={{ color: "#CCCCCC", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optional</span>
                      </label>
                      <input
                        type="tel" value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="07XX XXX XXX"
                        className={inputCls} style={inputStyle}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {!user && (
              <p className="font-sans text-[10px]" style={{ color: "#AAAAAA" }}>
                <Link href="/register" style={{ color: "#D4580A" }}>Join free</Link> to save this to your dashboard.
              </p>
            )}

            <button
              type="submit"
              className="w-full font-sans font-bold text-[11px] tracking-[0.15em] uppercase py-4 transition-all hover:brightness-110 cursor-pointer mt-2"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
            >
              {isFree
                ? "Download for Free"
                : payMethod === "paypal"
                ? "Continue to PayPal"
                : `Pay KES ${product.price_kes.toLocaleString()} via M-Pesa`} <Arr />
            </button>

            {!isFree && payMethod === "mpesa" && (
              <p className="font-sans text-[10px] text-center" style={{ color: "#AAAAAA" }}>
                STK push sent to your phone. Enter your PIN to confirm.
              </p>
            )}

            <p className="font-sans text-[10px] leading-relaxed pt-2" style={{ color: "#CCCCCC" }}>
              {isFree
                ? "By downloading you agree to receive occasional product updates. Unsubscribe any time."
                : <>
                    Digital products are non-refundable. By completing this purchase you confirm you have read the product description and agree to our{" "}
                    <a href="/terms" className="underline underline-offset-2" style={{ color: "#AAAAAA" }}>Terms of Service</a>.
                  </>
              }
            </p>
          </form>
        )}

        {/* ── Processing spinner ────────────────────────────────── */}
        {step === "processing" && (
          <div className="py-10 text-center">
            <div className="w-7 h-7 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
            <p className="font-sans font-medium" style={{ color: "#111111" }}>Processing…</p>
          </div>
        )}

        {/* ── M-Pesa polling ────────────────────────────────────── */}
        {step === "polling" && (
          <div className="py-10 text-center">
            <div className="w-7 h-7 border-2 rounded-full animate-spin mx-auto mb-6" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
            <p className="font-sans font-black text-xl uppercase tracking-tight mb-3" style={{ color: "#111111" }}>
              Check your phone
            </p>
            <p className="font-sans font-light text-sm leading-relaxed mx-auto" style={{ color: "#666666", maxWidth: 240 }}>
              M-Pesa prompt sent. Enter your PIN to complete payment.
            </p>
            <p className="font-sans text-[10px] mt-6" style={{ color: "#CCCCCC" }}>Waiting for confirmation…</p>
          </div>
        )}

        {/* ── PayPal button step ───────────────────────────────── */}
        {step === "paypal" && (
          <div className="py-4">
            <p className="font-sans font-medium mb-6 text-center" style={{ color: "#111111" }}>
              Click the button below to pay securely via PayPal.
            </p>
            <div ref={ppContRef} id="paypal-button-container" />
            <button
              onClick={() => { ppRendered.current = false; setStep("form"); }}
              className="mt-4 w-full font-sans text-[10px] tracking-[0.12em] uppercase text-center cursor-pointer"
              style={{ color: "#AAAAAA" }}
            >
              ← Back
            </button>
          </div>
        )}

        {/* ── Success ───────────────────────────────────────────── */}
        {step === "success" && (
          <div className="py-4">
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6 rotate-45" style={{ backgroundColor: "#D4580A" }}>
                <span className="font-black text-lg -rotate-45" style={{ color: "#FFFFFF" }}>✓</span>
              </div>
              <p className="font-sans font-black text-2xl uppercase tracking-tight mb-2" style={{ color: "#111111" }}>
                You&apos;re in.
              </p>
              <p className="font-sans font-light text-sm mb-8" style={{ color: "#666666" }}>
                A copy has been sent to <span style={{ color: "#111111" }}>{email}</span>.
              </p>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full font-sans font-bold text-[11px] tracking-[0.15em] uppercase py-4 hover:brightness-110 transition-all"
                  style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
                >
                  Download Now <Arr />
                </a>
              )}
            </div>

            {recs.length > 0 && (
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "#F0EDE8" }}>
                <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "#D4580A" }}>
                  Pair it with
                </p>
                <div className="mt-4 flex flex-col">
                  {recs.slice(0, 3).map((rec) => (
                    <div key={rec.slug} className="py-4 border-b flex items-start justify-between gap-4" style={{ borderColor: "#F0EDE8" }}>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className="font-sans font-semibold tracking-[0.14em] uppercase"
                          style={{ fontSize: "9px", color: rec.reason_type === "copurchase" ? "#1B3D8F" : "#BBBBBB" }}
                        >
                          {rec.reason}
                        </span>
                        <p className="font-sans text-sm font-medium leading-snug" style={{ color: "#111111" }}>{rec.title}</p>
                        <p className="font-sans text-xs font-light mt-0.5 leading-snug" style={{ color: "#888888" }}>{rec.tagline}</p>
                      </div>
                      <span
                        className="shrink-0 self-center font-sans font-semibold tracking-[0.1em] uppercase px-2 py-1"
                        style={rec.price_kes === 0
                          ? { backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "9px" }
                          : { border: "1px solid #D4580A", color: "#D4580A", fontSize: "9px" }}
                      >
                        {rec.price_kes === 0 ? "Free" : `KES ${rec.price_kes.toLocaleString()}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Error ─────────────────────────────────────────────── */}
        {step === "error" && (
          <div className="py-4">
            <p className="font-sans font-bold mb-3" style={{ color: "#111111" }}>Something went wrong</p>
            <p className="font-sans font-light text-sm leading-relaxed mb-6" style={{ color: "#666666" }}>{errorMsg}</p>
            <button
              onClick={() => { ppRendered.current = false; setStep("form"); setErrorMsg(""); }}
              className="w-full font-sans font-semibold text-[11px] tracking-[0.15em] uppercase py-3 border transition-all cursor-pointer hover:brightness-110"
              style={{ borderColor: "#D4580A", color: "#D4580A" }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
