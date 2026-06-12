"use client";

import { useState } from "react";

export default function Goodwill() {
  const [copied, setCopied]       = useState(false);
  const [showForm, setShowForm]   = useState(false);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [status, setStatus]       = useState<"idle" | "sending" | "done" | "error">("idle");
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
          className="font-sans font-light text-base leading-relaxed"
          style={{ color: "#666666", maxWidth: 500, margin: "0 auto 0.75rem" }}
        >
          Tools, templates, walkthroughs — built for East African founders and shared at no cost.
          If the work helped you, send whatever feels right. It keeps the free stuff coming.
        </p>
        <p
          className="font-sans text-sm mb-10"
          style={{ color: "#BBBBBB", maxWidth: 400, margin: "0 auto 2.5rem" }}
        >
          Goodwill givers get their name in the credits of everything I build from here.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={copy}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-full font-sans text-sm font-light transition-all hover:bg-orange-50"
            style={{ border: "1px solid #D4580A", color: "#D4580A", backgroundColor: "transparent", cursor: "pointer", minWidth: 220 }}
          >
            <span>📱</span>
            <span>{copied ? "Copied!" : `M-Pesa · ${mpesa}`}</span>
          </button>

          <a
            href="https://www.paypal.com/ncp/payment/SMQWWPUYBGL6Q"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-full font-sans text-sm font-light transition-all hover:bg-gray-50"
            style={{ border: "1px solid #CCCCCC", color: "#666666", backgroundColor: "transparent", minWidth: 220 }}
          >
            <span>🌍</span>
            <span>PayPal · International</span>
          </a>
        </div>

        {status === "done" ? (
          <p className="font-sans text-sm" style={{ color: "#D4580A" }}>
            You're in the credits. A thank-you is on its way to your inbox.
          </p>
        ) : (
          <>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="font-sans text-xs font-light underline underline-offset-2"
                style={{ color: "#BBBBBB", background: "none", border: "none", cursor: "pointer" }}
              >
                Sent via M-Pesa? Drop your email to get a thank-you + appear in the credits
              </button>
            ) : (
              <form
                onSubmit={submit}
                className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mt-2 max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Your name (for credits)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="font-sans text-sm font-light px-4 py-3 flex-1"
                  style={{ border: "1px solid #DDDDDD", background: "#FFFFFF", color: "#111111", outline: "none" }}
                />
                <input
                  type="email"
                  placeholder="Email address"
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
                  {status === "sending" ? "..." : "Submit"}
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
