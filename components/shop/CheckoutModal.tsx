"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";
import type { Product } from "@/app/shop/page";
import type { RecProduct } from "@/app/api/shop/recs/[slug]/route";
import { useAuth } from "@/context/AuthContext";

const API   = "https://dullu-shop-api.dullugroup.co.ke";
const MPESA = "0790117187";

const MpesaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/>
  </svg>
);

const PayPalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.076 21.337H4.19a.641.641 0 0 1-.633-.74L6.276 2.8a.773.773 0 0 1 .762-.648h5.946c2.676 0 4.51.557 5.456 1.657.455.532.733 1.094.848 1.717.12.654.098 1.43-.065 2.371l-.007.044v.387l.425.242a2.98 2.98 0 0 1 .864.719c.365.462.6 1.053.697 1.758.1.726.067 1.59-.098 2.568-.19 1.13-.5 2.114-.921 2.923a5.416 5.416 0 0 1-1.463 1.832c-.565.448-1.234.785-1.99.999-.735.208-1.578.314-2.505.314h-.598a1.85 1.85 0 0 0-1.826 1.561l-.077.415-.615 3.893-.028.145a.096.096 0 0 1-.095.082H7.076z" opacity=".8"/>
    <path d="M20.063 7.99c-.022.143-.047.29-.076.44-.982 5.04-4.344 6.782-8.637 6.782H9.19a1.062 1.062 0 0 0-1.049.899l-1.12 7.103-.317 2.01a.558.558 0 0 0 .55.645h3.872c.46 0 .852-.335.924-.789l.038-.199.733-4.648.047-.257a.935.935 0 0 1 .924-.789h.582c3.769 0 6.717-1.531 7.578-5.958.36-1.847.174-3.389-.777-4.474a3.713 3.713 0 0 0-1.016-.765z"/>
  </svg>
);

type Step = "form" | "processing" | "success" | "error";

function TipButton({ icon, label, copiedLabel, onClick, border, color }: {
  icon: React.ReactNode; label: string; copiedLabel: string;
  onClick: () => void; border: string; color: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => { onClick(); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex-1 flex items-center justify-center gap-2 py-2.5 font-sans text-[11px] font-light transition-all hover:bg-orange-50 cursor-pointer"
      style={{ border: `1px solid ${border}`, color, background: "transparent" }}
    >
      {icon}
      {copied ? copiedLabel : label}
    </button>
  );
}

export default function CheckoutModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { user } = useAuth();

  const [step, setStep]               = useState<Step>("form");
  const [name, setName]               = useState(user?.name ?? "");
  const [email, setEmail]             = useState(user?.email ?? "");
  const [whatsapp, setWhatsapp]       = useState("");
  const [marketing, setMarketing]     = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg]       = useState("");
  const [recs, setRecs]               = useState<RecProduct[]>([]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // Auto-submit for logged-in users
  useEffect(() => {
    if (!user || step !== "form") return;
    checkout(user.email, user.name, "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadRecs() {
    fetch(`/api/shop/recs/${product.slug}`)
      .then((r) => r.json())
      .then(({ recs: r }: { recs: RecProduct[] }) => setRecs(r ?? []))
      .catch(() => {});
  }

  async function checkout(emailVal: string, nameVal: string, waVal: string) {
    setStep("processing");
    setErrorMsg("");
    try {
      const res  = await fetch(`${API}/api/checkout`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          productSlug:      product.slug,
          email:            emailVal.trim(),
          name:             nameVal.trim(),
          paymentMethod:    "free",
          marketingConsent: marketing,
          ...(waVal.trim() ? { phone: waVal.trim() } : {}),
        }),
      });
      const data = await res.json() as {
        error?: string; downloadUrl?: string; alreadyOwned?: boolean;
      };
      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        loadRecs();
        setStep("success");
      } else {
        setErrorMsg(data.alreadyOwned
          ? "You already have this — check your email for the link."
          : (data.error ?? "Checkout failed."));
        setStep("error");
      }
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setStep("error");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await checkout(email, name, whatsapp);
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

        <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#1B3D8F" }}>
          Free Download
        </p>
        <h2 className="font-sans font-bold text-xl leading-snug mb-8 pr-6" style={{ color: "#111111" }}>
          {product.title}
        </h2>

        {/* ── Form ─────────────────────────────────────────────── */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">

            {user && (
              <div
                className="flex items-center gap-3 px-4 py-3 mb-2"
                style={{ backgroundColor: "#F8F5EB", borderLeft: "3px solid #D4580A" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-xs truncate" style={{ color: "#111111" }}>{user.name}</p>
                  <p className="font-sans text-[10px] truncate" style={{ color: "#888888" }}>{user.email}</p>
                </div>
              </div>
            )}

            {!user && [
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

            <div>
              <label className="block font-sans text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: "#888888" }}>
                WhatsApp <span style={{ color: "#CCCCCC", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optional</span>
              </label>
              <input
                type="tel" value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="07XX XXX XXX"
                className={inputCls} style={inputStyle}
              />
            </div>

            {!user && (
              <p className="font-sans text-[10px]" style={{ color: "#AAAAAA" }}>
                <Link href="/register" style={{ color: "#D4580A" }}>Create a free account</Link> to skip this form next time.
              </p>
            )}

            <button
              type="submit"
              className="w-full font-sans font-bold text-[11px] tracking-[0.15em] uppercase py-4 transition-all hover:brightness-110 cursor-pointer mt-2"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
            >
              Download for Free <Arr />
            </button>

            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-0.5 shrink-0 cursor-pointer"
                style={{ accentColor: "#D4580A", width: 14, height: 14 }}
              />
              <span className="font-sans text-[10px] leading-relaxed" style={{ color: "#888888" }}>
                Send me the weekly DR.DULLU digest. Unsubscribe any time.
              </span>
            </label>

            <p className="font-sans text-[10px] leading-relaxed" style={{ color: "#CCCCCC" }}>
              By downloading you agree to our{" "}
              <a href="/terms" className="underline underline-offset-2" style={{ color: "#AAAAAA" }}>Terms</a>
              {" "}and{" "}
              <a href="/privacy" className="underline underline-offset-2" style={{ color: "#AAAAAA" }}>Privacy Policy</a>.
            </p>
          </form>
        )}

        {/* ── Processing ───────────────────────────────────────── */}
        {step === "processing" && (
          <div className="py-10 text-center">
            <div className="w-7 h-7 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
            <p className="font-sans font-medium" style={{ color: "#111111" }}>Processing…</p>
          </div>
        )}

        {/* ── Success ──────────────────────────────────────────── */}
        {step === "success" && (
          <div className="py-4">
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6 rotate-45" style={{ backgroundColor: "#D4580A" }}>
                <span className="font-black text-lg -rotate-45" style={{ color: "#FFFFFF" }}>✓</span>
              </div>
              <p className="font-sans font-black text-2xl uppercase tracking-tight mb-2" style={{ color: "#111111" }}>You&apos;re in.</p>
              <p className="font-sans font-light text-sm mb-8" style={{ color: "#666666" }}>
                A copy has been sent to <span style={{ color: "#111111" }}>{email || user?.email}</span>.
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

              <div className="mt-8 pt-6 border-t" style={{ borderColor: "#F0EDE8" }}>
                <p className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#AAAAAA" }}>
                  If this helped you
                </p>
                <div className="flex gap-3">
                  <TipButton
                    icon={<MpesaIcon />}
                    label={`M-Pesa · ${MPESA}`}
                    copiedLabel="Copied!"
                    onClick={() => navigator.clipboard.writeText(MPESA).catch(() => {})}
                    border="#D4580A"
                    color="#D4580A"
                  />
                  <a
                    href="https://www.paypal.com/ncp/payment/SMQWWPUYBGL6Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 font-sans text-[11px] font-light transition-all hover:bg-gray-50"
                    style={{ border: "1px solid #DDDDDD", color: "#888888" }}
                  >
                    <PayPalIcon />
                    PayPal
                  </a>
                </div>
              </div>
            </div>

            {recs.length > 0 && (
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "#F0EDE8" }}>
                <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: "#D4580A" }}>
                  Also free
                </p>
                <div className="flex flex-col">
                  {recs.slice(0, 3).map((rec) => (
                    <div key={rec.slug} className="py-4 border-b flex items-start justify-between gap-4" style={{ borderColor: "#F0EDE8" }}>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="font-sans text-sm font-medium leading-snug" style={{ color: "#111111" }}>{rec.title}</p>
                        <p className="font-sans text-xs font-light mt-0.5 leading-snug" style={{ color: "#888888" }}>{rec.tagline}</p>
                      </div>
                      <span
                        className="shrink-0 self-center font-sans font-semibold tracking-[0.1em] uppercase px-2 py-1"
                        style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "9px" }}
                      >
                        Free
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Error ────────────────────────────────────────────── */}
        {step === "error" && (
          <div className="py-4">
            <p className="font-sans font-bold mb-3" style={{ color: "#111111" }}>Something went wrong</p>
            <p className="font-sans font-light text-sm leading-relaxed mb-6" style={{ color: "#666666" }}>{errorMsg}</p>
            <button
              onClick={() => { setStep("form"); setErrorMsg(""); }}
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
