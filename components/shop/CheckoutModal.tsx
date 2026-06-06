"use client";

import { useState, useEffect, useRef } from "react";
import type { Product } from "@/app/shop/page";

const API = "https://dullu-shop-api.dullugroup.co.ke";

type Step = "form" | "processing" | "polling" | "success" | "error";

export default function CheckoutModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const isFree = product.price_kes === 0;

  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function startPolling(orderId: string) {
    setStep("polling");
    let attempts = 0;

    pollRef.current = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`${API}/api/order/${orderId}`);
        const data = await res.json() as { status: string; downloadUrl: string | null };

        if (data.status === "paid" && data.downloadUrl) {
          clearInterval(pollRef.current!);
          setDownloadUrl(data.downloadUrl);
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
      } catch {
        // network blip — keep polling
      }
    }, 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("processing");
    setErrorMsg("");

    try {
      const body: Record<string, string> = {
        productSlug: product.slug,
        email: email.trim(),
        name: name.trim(),
        paymentMethod: isFree ? "free" : "mpesa",
      };
      if (!isFree) body.phone = phone.trim();

      const res = await fetch(`${API}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json() as {
        error?: string;
        downloadUrl?: string;
        orderId?: string;
        alreadyOwned?: boolean;
      };

      if (!res.ok) {
        if (data.alreadyOwned) {
          setErrorMsg("You already own this. Check your email for the download link.");
        } else {
          setErrorMsg(data.error ?? "Checkout failed. Please try again.");
        }
        setStep("error");
        return;
      }

      if (isFree && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        setStep("success");
        return;
      }

      if (data.orderId) {
        startPolling(data.orderId);
      }
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setStep("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 backdrop-blur-sm px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-ink-light border border-gold/20 w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-grey hover:text-offwhite text-2xl leading-none cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>

        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-2">
          {isFree ? "Free Download" : `KES ${product.price_kes.toLocaleString()}`}
        </p>
        <h2 className="font-bold text-offwhite text-xl leading-snug mb-8 pr-6">
          {product.title}
        </h2>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-grey mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Wanjiru"
                className="w-full bg-ink border border-gold/20 text-offwhite placeholder:text-grey/40 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-grey mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full bg-ink border border-gold/20 text-offwhite placeholder:text-grey/40 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {!isFree && (
              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-grey mb-2">
                  M-Pesa Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712 345 678"
                  className="w-full bg-ink border border-gold/20 text-offwhite placeholder:text-grey/40 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold text-ink font-bold text-sm tracking-[0.1em] uppercase py-4 hover:brightness-110 transition-all cursor-pointer mt-2"
            >
              {isFree
                ? "Download for Free →"
                : `Pay KES ${product.price_kes.toLocaleString()} via M-Pesa →`}
            </button>

            {!isFree && (
              <p className="text-xs text-grey/50 text-center pt-1">
                STK push will be sent to your phone. Enter your PIN to confirm.
              </p>
            )}
          </form>
        )}

        {(step === "processing") && (
          <div className="py-10 text-center">
            <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
            <p className="text-offwhite font-medium">Processing...</p>
          </div>
        )}

        {step === "polling" && (
          <div className="py-10 text-center">
            <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-6" />
            <p className="font-black text-offwhite text-xl uppercase tracking-tight mb-3">
              Check your phone
            </p>
            <p className="font-light text-grey text-sm leading-relaxed max-w-xs mx-auto">
              An M-Pesa prompt has been sent to your phone. Enter your PIN to complete payment.
            </p>
            <p className="text-xs text-grey/40 mt-6">Waiting for confirmation...</p>
          </div>
        )}

        {step === "success" && (
          <div className="py-4 text-center">
            <div className="w-12 h-12 bg-gold flex items-center justify-center mx-auto mb-6 rotate-45">
              <span className="text-ink font-black text-lg -rotate-45">✓</span>
            </div>
            <p className="font-black text-offwhite text-2xl uppercase tracking-tight mb-2">
              You&apos;re in.
            </p>
            <p className="font-light text-grey text-sm mb-8">
              A copy has also been sent to <span className="text-offwhite">{email}</span>.
            </p>
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gold text-ink font-bold text-sm tracking-[0.1em] uppercase py-4 hover:brightness-110 transition-all"
              >
                Download Now →
              </a>
            )}
          </div>
        )}

        {step === "error" && (
          <div className="py-4">
            <p className="font-bold text-offwhite mb-3">Something went wrong</p>
            <p className="font-light text-grey text-sm leading-relaxed mb-6">{errorMsg}</p>
            <button
              onClick={() => { setStep("form"); setErrorMsg(""); }}
              className="w-full border border-gold text-gold font-semibold text-sm tracking-[0.1em] uppercase py-3 hover:bg-gold hover:text-ink transition-all cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
