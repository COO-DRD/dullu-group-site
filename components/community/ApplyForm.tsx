"use client";

import { useState } from "react";

const STAGES = [
  { value: "pre-revenue",    label: "Pre-revenue",    sub: "Still building or validating" },
  { value: "first-revenue",  label: "First revenue",  sub: "Making money, finding the model" },
  { value: "scaling",        label: "Scaling",        sub: "Proven, growing fast" },
];

const NEEDS = [
  { value: "clients",      label: "Clients",      sub: "More paying customers" },
  { value: "co-founder",   label: "Co-founder",   sub: "Someone to build with" },
  { value: "capital",      label: "Capital",      sub: "Funding or investment" },
  { value: "knowledge",    label: "Knowledge",    sub: "People who've done it" },
  { value: "just-a-room",  label: "Just a room",  sub: "Peers who get it" },
];

function OptionButton({
  selected,
  onClick,
  label,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left px-5 py-4 border transition-all cursor-pointer"
      style={{
        borderColor:     selected ? "#D4580A" : "#F0EDE8",
        backgroundColor: selected ? "#FFF8F4" : "#FAFAF8",
        flex:            "1 1 auto",
        minWidth:        "140px",
      }}
    >
      <p
        className="font-sans font-bold text-sm"
        style={{ color: selected ? "#D4580A" : "#111111" }}
      >
        {label}
      </p>
      <p className="font-sans font-light text-xs mt-0.5" style={{ color: "#888888" }}>
        {sub}
      </p>
    </button>
  );
}

export default function ApplyForm() {
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [building, setBuilding]     = useState("");
  const [stage, setStage]           = useState("");
  const [needs, setNeeds]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);
  const [error, setError]           = useState("");

  const canSubmit = name.trim() && email.trim() && building.trim() && stage && needs && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/community/apply", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:     name.trim(),
          email:    email.trim(),
          building: building.trim(),
          stage,
          needs,
        }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) { setError(data.error ?? "Something went wrong. Try again."); return; }
      setDone(true);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div style={{ backgroundColor: "#FFFFFF", minHeight: "80vh" }}>
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24">
          <div className="max-w-xl">
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-6"
              style={{ color: "#1B3D8F" }}
            >
              The Young African Founder
            </p>
            <div
              className="w-12 h-12 flex items-center justify-center mb-8 rotate-45"
              style={{ backgroundColor: "#D4580A" }}
            >
              <span className="font-black text-base -rotate-45" style={{ color: "#FFFFFF" }}>✓</span>
            </div>
            <h1
              className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-6"
              style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#111111" }}
            >
              Application received.
            </h1>
            <p className="font-sans font-light text-lg leading-relaxed mb-4" style={{ color: "#444444" }}>
              Ian reviews every application himself. If it&apos;s a fit, he&apos;ll DM you on WhatsApp
              with the private group link — usually within a few days.
            </p>
            <p className="font-sans font-light text-base leading-relaxed mb-10" style={{ color: "#666666" }}>
              Check your inbox — a confirmation is on its way.
            </p>
            <a
              href="https://whatsapp.com/channel/0029VbCyuTQGufIzlFkQ2f0p"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-8 py-4 inline-block transition-all hover:brightness-110"
              style={{ backgroundColor: "#111111", color: "#F8F5EB" }}
            >
              Follow the public channel while you wait
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <p
          className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
          style={{ color: "#1B3D8F" }}
        >
          The Young African Founder
        </p>
        <h1
          className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-6"
          style={{ fontSize: "clamp(2.6rem,6vw,5rem)", color: "#D4580A", maxWidth: "16ch" }}
        >
          Apply to join.
        </h1>
        <p
          className="font-sans font-light text-lg leading-relaxed mb-3"
          style={{ color: "#444444", maxWidth: "40rem" }}
        >
          A private community of founders building lean — from cities nobody expected,
          without institutional backing, in markets the global tech conversation ignores.
        </p>
        <p className="font-sans font-light text-base leading-relaxed" style={{ color: "#888888", maxWidth: "38rem" }}>
          We review every application personally. The barrier is care, not credentials.
          Three questions. Takes two minutes.
        </p>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ borderTop: "1px solid #F0EDE8" }} />
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="max-w-2xl">

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            <div>
              <label
                className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase block mb-2"
                style={{ color: "#888888" }}
              >
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ian Dullu"
                className="w-full font-sans text-sm font-light px-4 py-3 focus:outline-none"
                style={{ backgroundColor: "#FAFAF8", border: "1px solid #F0EDE8", color: "#111111" }}
                onFocus={e  => { e.currentTarget.style.borderColor = "rgba(212,88,10,0.45)"; }}
                onBlur={e   => { e.currentTarget.style.borderColor = "#F0EDE8"; }}
              />
            </div>
            <div>
              <label
                className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase block mb-2"
                style={{ color: "#888888" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full font-sans text-sm font-light px-4 py-3 focus:outline-none"
                style={{ backgroundColor: "#FAFAF8", border: "1px solid #F0EDE8", color: "#111111" }}
                onFocus={e  => { e.currentTarget.style.borderColor = "rgba(212,88,10,0.45)"; }}
                onBlur={e   => { e.currentTarget.style.borderColor = "#F0EDE8"; }}
              />
            </div>
          </div>

          {/* Q1 */}
          <div className="mb-14">
            <div className="flex items-baseline gap-4 mb-5">
              <span
                className="font-cinematic font-light leading-none shrink-0"
                style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#F0EDE8" }}
              >
                01
              </span>
              <label className="font-sans font-black uppercase tracking-tight" style={{ fontSize: "clamp(1.1rem,2.5vw,1.6rem)", color: "#111111" }}>
                What are you building?
              </label>
            </div>
            <textarea
              required
              value={building}
              onChange={e => setBuilding(e.target.value)}
              placeholder="One sentence. What is it, who is it for."
              rows={2}
              maxLength={300}
              className="w-full font-sans text-sm font-light px-4 py-3 resize-none focus:outline-none"
              style={{ backgroundColor: "#FAFAF8", border: "1px solid #F0EDE8", color: "#111111", lineHeight: 1.75 }}
              onFocus={e  => { e.currentTarget.style.borderColor = "rgba(212,88,10,0.45)"; }}
              onBlur={e   => { e.currentTarget.style.borderColor = "#F0EDE8"; }}
            />
            <p className="font-sans text-xs mt-2" style={{ color: "#BBBBBB" }}>
              {building.length}/300
            </p>
          </div>

          {/* Q2 */}
          <div className="mb-14">
            <div className="flex items-baseline gap-4 mb-5">
              <span
                className="font-cinematic font-light leading-none shrink-0"
                style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#F0EDE8" }}
              >
                02
              </span>
              <label className="font-sans font-black uppercase tracking-tight" style={{ fontSize: "clamp(1.1rem,2.5vw,1.6rem)", color: "#111111" }}>
                What stage are you at?
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              {STAGES.map(s => (
                <OptionButton
                  key={s.value}
                  selected={stage === s.value}
                  onClick={() => setStage(s.value)}
                  label={s.label}
                  sub={s.sub}
                />
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div className="mb-14">
            <div className="flex items-baseline gap-4 mb-5">
              <span
                className="font-cinematic font-light leading-none shrink-0"
                style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#F0EDE8" }}
              >
                03
              </span>
              <label className="font-sans font-black uppercase tracking-tight" style={{ fontSize: "clamp(1.1rem,2.5vw,1.6rem)", color: "#111111" }}>
                What do you need most right now?
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              {NEEDS.map(n => (
                <OptionButton
                  key={n.value}
                  selected={needs === n.value}
                  onClick={() => setNeeds(n.value)}
                  label={n.label}
                  sub={n.sub}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div style={{ borderTop: "1px solid #F0EDE8", paddingTop: "2.5rem" }}>
            <button
              type="submit"
              disabled={!canSubmit}
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-4 transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full border-2 animate-spin inline-block shrink-0"
                    style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#FFFFFF" }}
                  />
                  Sending...
                </span>
              ) : "Send Application"}
            </button>

            {error && (
              <p className="font-sans text-sm mt-4" style={{ color: "#CC3333" }}>{error}</p>
            )}

            <p className="font-sans font-light text-xs mt-5" style={{ color: "#BBBBBB", maxWidth: "32rem" }}>
              Ian reviews applications personally. If it&apos;s a fit, you&apos;ll get a WhatsApp DM
              with the private group link — usually within a few days. No sales emails.
              No pitch decks.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
