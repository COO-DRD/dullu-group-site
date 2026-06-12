"use client";

import { useState } from "react";

const MpesaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12" y2="18.01"/>
  </svg>
);

const PayPalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.076 21.337H4.19a.641.641 0 0 1-.633-.74L6.276 2.8a.773.773 0 0 1 .762-.648h5.946c2.676 0 4.51.557 5.456 1.657.455.532.733 1.094.848 1.717.12.654.098 1.43-.065 2.371l-.007.044v.387l.425.242a2.98 2.98 0 0 1 .864.719c.365.462.6 1.053.697 1.758.1.726.067 1.59-.098 2.568-.19 1.13-.5 2.114-.921 2.923a5.416 5.416 0 0 1-1.463 1.832c-.565.448-1.234.785-1.99.999-.735.208-1.578.314-2.505.314h-.598a1.85 1.85 0 0 0-1.826 1.561l-.077.415-.615 3.893-.028.145a.096.096 0 0 1-.095.082H7.076z" opacity=".8"/>
    <path d="M20.063 7.99c-.022.143-.047.29-.076.44-.982 5.04-4.344 6.782-8.637 6.782H9.19a1.062 1.062 0 0 0-1.049.899l-1.12 7.103-.317 2.01a.558.558 0 0 0 .55.645h3.872c.46 0 .852-.335.924-.789l.038-.199.733-4.648.047-.257a.935.935 0 0 1 .924-.789h.582c3.769 0 6.717-1.531 7.578-5.958.36-1.847.174-3.389-.777-4.474a3.713 3.713 0 0 0-1.016-.765z"/>
  </svg>
);

export default function Goodwill() {
  const [copied, setCopied]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "sending" | "done" | "error">("idle");
  const mpesa = "0790117187";

  function copy() {
    navigator.clipboard.writeText(mpesa).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/goodwill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="goodwill" style={{ backgroundColor: "#FAFAF8", borderTop: "1px solid #F0EDE8" }}>
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <p
          className="font-cinematic font-semibold tracking-[0.18em] uppercase mb-3"
          style={{ fontSize: "0.7rem", color: "#D4580A" }}
        >
          The Young African Founder
        </p>
        <h2
          className="font-sans font-black uppercase mb-4"
          style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          Everything here is free.
        </h2>
        <p
          className="font-sans font-light text-base leading-relaxed mb-8"
          style={{ color: "#666666", maxWidth: 440, margin: "0 auto 2rem" }}
        >
          If something helped you, send what you can. No obligation.
        </p>

        <a
          href="https://whatsapp.com/channel/0029VbCyuTQGuflzlFkQ2f0p"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest mb-10 transition-opacity hover:opacity-70"
          style={{ color: "#25D366", letterSpacing: "0.15em" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Join the Community
        </a>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={copy}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-full font-sans text-sm font-light transition-all hover:bg-orange-50"
            style={{ border: "1px solid #D4580A", color: "#D4580A", backgroundColor: "transparent", cursor: "pointer", minWidth: 220 }}
          >
            <MpesaIcon />
            <span>{copied ? "Copied!" : `M-Pesa · ${mpesa}`}</span>
          </button>

          <a
            href="https://www.paypal.com/ncp/payment/SMQWWPUYBGL6Q"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-full font-sans text-sm font-light transition-all hover:bg-gray-50"
            style={{ border: "1px solid #CCCCCC", color: "#666666", backgroundColor: "transparent", minWidth: 220 }}
          >
            <PayPalIcon />
            <span>PayPal</span>
          </a>
        </div>

        {status === "done" ? (
          <p className="font-sans text-sm" style={{ color: "#888888" }}>
            Thank you.
          </p>
        ) : (
          <>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="font-sans text-xs font-light underline underline-offset-2"
                style={{ color: "#BBBBBB", background: "none", border: "none", cursor: "pointer" }}
              >
                Sent via M-Pesa? Leave your email.
              </button>
            ) : (
              <form
                onSubmit={submit}
                className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mt-2 max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="font-sans text-sm font-light px-4 py-3 flex-1"
                  style={{ border: "1px solid #DDDDDD", background: "#FFFFFF", color: "#111111", outline: "none" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="font-sans text-sm font-light px-4 py-3 flex-1"
                  style={{ border: "1px solid #DDDDDD", background: "#FFFFFF", color: "#111111", outline: "none" }}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-sans text-xs font-bold uppercase px-6 py-3 whitespace-nowrap"
                  style={{ background: "#D4580A", color: "#FFFFFF", border: "none", cursor: "pointer", letterSpacing: "0.15em" }}
                >
                  {status === "sending" ? "..." : "Send"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="font-sans text-xs mt-3" style={{ color: "#CC0000" }}>
                Something went wrong. Try again.
              </p>
            )}
          </>
        )}

      </div>
    </section>
  );
}
