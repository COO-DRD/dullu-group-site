"use client";

import { useState, useEffect, useRef } from "react";

interface Category {
  name: string;
  score: number;
  max: number;
  issue: string;
  fix: string;
}

interface CheckResult {
  score: number;
  grade: string;
  summary: string;
  categories: Category[];
  quick_wins: string[];
}

function scoreColor(score: number): string {
  if (score >= 85) return "#2A8A4A";
  if (score >= 65) return "#1B3D8F";
  if (score >= 45) return "#D4580A";
  return "#CC3333";
}

function catColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.85) return "#2A8A4A";
  if (pct >= 0.70) return "#1B3D8F";
  if (pct >= 0.50) return "#D4580A";
  return "#CC3333";
}

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTs: number | null = null;
    const duration = 900;

    function step(ts: number) {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [target]);

  return <>{display}</>;
}

export default function ColdEmailChecker() {
  const [email, setEmail]               = useState("");
  const [audience, setAudience]         = useState("");
  const [loading, setLoading]           = useState(false);
  const [result, setResult]             = useState<CheckResult | null>(null);
  const [error, setError]               = useState("");
  const [capture, setCapture]           = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "sending" | "done">("idle");
  const resultsRef                      = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    setCaptureStatus("idle");

    try {
      const res = await fetch("/api/tools/cold-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), audience: audience.trim() }),
      });
      const data = await res.json() as CheckResult & { error?: string };
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setResult(data);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!capture.trim() || captureStatus !== "idle") return;
    setCaptureStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: capture.trim(), source: "cold-email-tool" }),
      });
      setCaptureStatus(res.ok ? "done" : "idle");
    } catch {
      setCaptureStatus("idle");
    }
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", paddingTop: "4rem" }}>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p
          className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
          style={{ color: "#1B3D8F" }}
        >
          01 — Free Tools
        </p>
        <h1
          className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-5"
          style={{ fontSize: "clamp(2.6rem,6vw,5.5rem)", color: "#D4580A", maxWidth: "18ch" }}
        >
          Cold Email Diagnostic
        </h1>
        <p
          className="font-sans font-light text-lg leading-relaxed"
          style={{ color: "#666666", maxWidth: "40rem" }}
        >
          Paste your cold email. Get a score, a breakdown by category, and the exact fixes.
          Based on data from Boomerang, Yesware, and Outreach. Free. Always.
        </p>
      </div>

      {/* Input */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase block mb-2"
              style={{ color: "#888888" }}
            >
              Your cold email
            </label>
            <textarea
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={"Subject: [paste subject line here]\n\nHi [Name],\n\n[Paste your full email here — include the subject line if you have one]"}
              rows={10}
              required
              className="w-full font-sans text-sm font-light px-5 py-4 resize-y focus:outline-none"
              style={{
                backgroundColor: "#FAFAF8",
                border: "1px solid #F0EDE8",
                color: "#111111",
                lineHeight: 1.75,
                transition: "border-color 0.15s",
              }}
              onFocus={e  => { e.currentTarget.style.borderColor = "rgba(212,88,10,0.45)"; }}
              onBlur={e   => { e.currentTarget.style.borderColor = "#F0EDE8"; }}
            />
          </div>

          <div className="mb-8">
            <label
              className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase block mb-2"
              style={{ color: "#888888" }}
            >
              Who are you targeting?{" "}
              <span style={{ color: "#BBBBBB", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                optional
              </span>
            </label>
            <input
              type="text"
              value={audience}
              onChange={e => setAudience(e.target.value)}
              placeholder="e.g. SaaS founders, marketing managers at SMEs, e-commerce brands..."
              className="w-full font-sans text-sm font-light px-5 py-3 focus:outline-none"
              style={{
                backgroundColor: "#FAFAF8",
                border: "1px solid #F0EDE8",
                color: "#111111",
                maxWidth: "38rem",
                transition: "border-color 0.15s",
              }}
              onFocus={e  => { e.currentTarget.style.borderColor = "rgba(212,88,10,0.45)"; }}
              onBlur={e   => { e.currentTarget.style.borderColor = "#F0EDE8"; }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-4 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border-2 animate-spin inline-block shrink-0"
                  style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#FFFFFF" }}
                />
                Analysing...
              </span>
            ) : "Check My Email"}
          </button>

          {error && (
            <p className="font-sans text-sm mt-4" style={{ color: "#CC3333" }}>{error}</p>
          )}
        </form>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultsRef}>

          {/* Score card */}
          <div style={{ backgroundColor: "#111111" }}>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p
                className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-6"
                style={{ color: "#D4580A" }}
              >
                Your Score
              </p>
              <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                <div className="flex items-end gap-3 shrink-0">
                  <span
                    className="font-sans font-black leading-none tabular-nums"
                    style={{ fontSize: "clamp(4.5rem,12vw,8rem)", color: scoreColor(result.score) }}
                  >
                    <AnimatedScore target={result.score} />
                  </span>
                  <div className="mb-2 flex flex-col items-start">
                    <span className="font-sans font-light text-xl" style={{ color: "rgba(248,245,235,0.3)" }}>
                      /100
                    </span>
                    <span
                      className="font-sans font-black text-4xl leading-none"
                      style={{ color: scoreColor(result.score), opacity: 0.4 }}
                    >
                      {result.grade}
                    </span>
                  </div>
                </div>
                <p
                  className="font-sans font-light text-xl leading-relaxed md:mb-3"
                  style={{ color: "rgba(248,245,235,0.75)", maxWidth: "34rem" }}
                >
                  {result.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div style={{ backgroundColor: "#FAFAF8" }}>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p
                className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-10"
                style={{ color: "#1B3D8F" }}
              >
                Breakdown
              </p>

              <div style={{ borderTop: "1px solid #F0EDE8" }}>
                {result.categories.map(cat => {
                  const pct  = (cat.score / cat.max) * 100;
                  const color = catColor(cat.score, cat.max);
                  return (
                    <div key={cat.name} className="py-8" style={{ borderBottom: "1px solid #F0EDE8" }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-sans font-semibold text-sm" style={{ color: "#111111" }}>
                          {cat.name}
                        </span>
                        <span className="font-sans font-bold text-sm tabular-nums" style={{ color }}>
                          {cat.score}
                          <span className="font-light" style={{ color: "#CCCCCC" }}>/{cat.max}</span>
                        </span>
                      </div>

                      <div
                        className="h-1 w-full mb-6 overflow-hidden"
                        style={{ backgroundColor: "#EEEBE6", borderRadius: 2 }}
                      >
                        <div
                          className="h-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: color, borderRadius: 2 }}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <p
                            className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                            style={{ color: "#BBBBBB" }}
                          >
                            Issue
                          </p>
                          <p className="font-sans text-sm font-light leading-relaxed" style={{ color: "#555555" }}>
                            {cat.issue}
                          </p>
                        </div>
                        <div>
                          <p
                            className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                            style={{ color: "#1B3D8F" }}
                          >
                            Fix
                          </p>
                          <p className="font-sans text-sm font-light leading-relaxed" style={{ color: "#222222" }}>
                            {cat.fix}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick wins */}
              {result.quick_wins.length > 0 && (
                <div className="mt-14">
                  <p
                    className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-6"
                    style={{ color: "#D4580A" }}
                  >
                    Quick Wins — Fix These First
                  </p>
                  <ol className="flex flex-col gap-4">
                    {result.quick_wins.map((win, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span
                          className="font-sans font-black text-xs shrink-0 w-6 h-6 flex items-center justify-center"
                          style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
                        >
                          {i + 1}
                        </span>
                        <p
                          className="font-sans text-sm font-light leading-relaxed pt-0.5"
                          style={{ color: "#333333" }}
                        >
                          {win}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Check another */}
              <button
                onClick={() => {
                  setResult(null);
                  setEmail("");
                  setAudience("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-14 font-sans text-xs font-medium underline underline-offset-2"
                style={{ color: "#888888", background: "none", border: "none", cursor: "pointer" }}
              >
                ← Check another email
              </button>
            </div>
          </div>

          {/* Soft email capture */}
          <div style={{ backgroundColor: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p
                className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-4"
                style={{ color: "#D4580A" }}
              >
                Stay Sharp
              </p>
              <h2
                className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-4"
                style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)", color: "#F8F5EB" }}
              >
                Weekly sales & automation drops.
              </h2>
              <p
                className="font-sans font-light mb-8"
                style={{ color: "rgba(248,245,235,0.55)", maxWidth: "34rem" }}
              >
                Cold email templates, outreach frameworks, and automation walkthroughs.
                No AI fluff.
              </p>

              {captureStatus === "done" ? (
                <p className="font-sans font-medium" style={{ color: "#F8F5EB" }}>
                  You&apos;re in. First drop on its way.
                </p>
              ) : (
                <form onSubmit={handleCapture} className="flex flex-col sm:flex-row gap-0 max-w-md">
                  <input
                    type="email"
                    required
                    value={capture}
                    onChange={e => setCapture(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 font-sans text-sm px-5 py-4 focus:outline-none"
                    style={{
                      backgroundColor: "rgba(248,245,235,0.07)",
                      border: "1px solid rgba(248,245,235,0.15)",
                      borderRight: "none",
                      color: "#F8F5EB",
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(212,88,10,0.6)"; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = "rgba(248,245,235,0.15)"; }}
                  />
                  <button
                    type="submit"
                    disabled={captureStatus === "sending"}
                    className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all hover:brightness-110 disabled:opacity-60 cursor-pointer shrink-0"
                    style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
                  >
                    {captureStatus === "sending" ? "..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Goodwill nudge */}
          <div style={{ backgroundColor: "#FAFAF8", borderTop: "1px solid #F0EDE8" }}>
            <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-sans font-light text-sm" style={{ color: "#888888", maxWidth: "28rem" }}>
                This tool is free. If it helped you, a small goodwill tip keeps it running.
              </p>
              <a
                href="/#goodwill"
                className="font-sans font-bold text-[11px] tracking-[0.18em] uppercase px-6 py-3 transition-all hover:brightness-110 shrink-0"
                style={{ backgroundColor: "#F0EDE8", color: "#D4580A" }}
              >
                Send Goodwill
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
