"use client";

import { useState, useRef, useEffect } from "react";
import Arr from "@/components/Arr";

export default function Subscribe() {
  const [email, setEmail]   = useState("");
  const [busy, setBusy]     = useState(false);
  const [done, setDone]     = useState(false);
  const [error, setError]   = useState("");
  const sectionRef          = useRef<HTMLElement>(null);
  const contentRef          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res  = await fetch("/api/subscribe", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source: "homepage" }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setDone(true);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#111111" }}>
      <div
        ref={contentRef}
        className="reveal max-w-6xl mx-auto px-6 py-28 md:py-36"
      >
        <p
          className="font-sans font-semibold uppercase tracking-[0.28em] mb-5"
          style={{ fontSize: "10px", color: "#D4580A" }}
        >
          Stay in the loop
        </p>

        <h2
          className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-6"
          style={{ fontSize: "clamp(2.6rem,6vw,6rem)", color: "#F8F5EB", maxWidth: "20ch" }}
        >
          In your inbox before everyone else.
        </h2>

        <p
          className="font-sans font-light leading-relaxed mb-12"
          style={{ color: "rgba(248,245,235,0.55)", maxWidth: "36rem", fontSize: "1.05rem" }}
        >
          One email when something ships — systems, tools, real numbers.
          No noise. Unsubscribe any time.
        </p>

        {done ? (
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 flex items-center justify-center rotate-45 shrink-0"
              style={{ backgroundColor: "#D4580A" }}
            >
              <span className="font-black text-sm -rotate-45" style={{ color: "#FFFFFF" }}>✓</span>
            </div>
            <p className="font-sans font-medium" style={{ color: "#F8F5EB" }}>
              You&apos;re in. Watch your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-xl">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 font-sans text-sm px-5 py-4 focus:outline-none"
              style={{
                backgroundColor: "rgba(248,245,235,0.07)",
                border:          "1px solid rgba(248,245,235,0.15)",
                borderRight:     "none",
                color:           "#F8F5EB",
              }}
              onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(212,88,10,0.6)"; }}
              onBlur={(e)  => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(248,245,235,0.15)"; }}
            />
            <button
              type="submit"
              disabled={busy}
              className="font-sans font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all hover:brightness-110 disabled:opacity-60 cursor-pointer shrink-0"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "11px" }}
            >
              {busy ? "…" : <><span>Subscribe</span> <Arr /></>}
            </button>
          </form>
        )}

        {error && (
          <p className="font-sans text-sm mt-3" style={{ color: "#D4580A" }}>{error}</p>
        )}
      </div>
    </section>
  );
}
