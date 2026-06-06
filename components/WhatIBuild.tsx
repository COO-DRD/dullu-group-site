"use client";

import { useEffect, useRef } from "react";

const panels = [
  {
    label:  "Playbooks",
    n:      "01",
    heading: "Self-serve weapons you build once.",
    body:    "Step-by-step automation systems for Kenyan business owners. WhatsApp, M-Pesa, AI prompts, lead follow-up. Built for East African reality.",
    price:  "From KES 999",
    cta:    "Browse the Shop",
    href:   "/shop",
    photo:  "/dr-standing.jpg",
    pos:    "center top",
    accent: "#D4580A",
  },
  {
    label:  "Automation Builds",
    n:      "02",
    heading: "Done-for-you. We build it. You run it.",
    body:    "Custom automation through Dullu Digital. WhatsApp bots, lead pipelines, M-Pesa flows. Full build. Full handover.",
    price:  "From KES 120,000",
    cta:    "Go to Dullu Digital",
    href:   "https://digital.dullugroup.co.ke",
    photo:  "/dr-seated.jpg",
    pos:    "center 20%",
    accent: "#1B3D8F",
  },
  {
    label:  "Lead Intelligence",
    n:      "03",
    heading: "500 leads before your competitor finds five.",
    body:    "4unter finds, enriches and AI-scores leads from any market. Fire outreach directly or import to any pipeline.",
    price:  "Free trial",
    cta:    "Try 4unter",
    href:   "https://4unter.dullugroup.co.ke",
    photo:  "/dr-outdoor.jpg",
    pos:    "center 30%",
    accent: "#D4580A",
  },
];

function Panel({ panel, wrapperRef }: { panel: typeof panels[0]; wrapperRef: React.RefObject<HTMLDivElement | null> }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="sticky top-0 h-screen overflow-hidden flex items-end"
      style={{ zIndex: 1 }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${panel.photo})`,
          backgroundSize: "cover",
          backgroundPosition: panel.pos,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.10) 60%, transparent 100%)",
        }}
      />

      {/* Content — anchored to bottom */}
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl mx-auto px-8 pb-16 md:pb-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
              style={{ color: panel.accent }}
            >
              {panel.n} — {panel.label}
            </p>
            <h3
              className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-5"
              style={{
                fontSize: "clamp(2rem,5vw,5rem)",
                color: "#F8F5EB",
                maxWidth: "18ch",
              }}
            >
              {panel.heading}
            </h3>
            <p
              className="font-sans font-light text-base leading-relaxed mb-2"
              style={{ color: "rgba(248,245,235,0.75)", maxWidth: "38rem" }}
            >
              {panel.body}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <p className="font-sans text-sm font-light" style={{ color: "rgba(248,245,235,0.5)" }}>
              {panel.price}
            </p>
            <a
              href={panel.href}
              target={panel.href.startsWith("http") ? "_blank" : undefined}
              rel={panel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all hover:brightness-110 inline-block"
              style={{ backgroundColor: panel.accent, color: "#FFFFFF" }}
            >
              {panel.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Panel number watermark */}
      <div
        className="absolute top-8 right-8 font-cinematic font-light leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(6rem,14vw,14rem)", color: "rgba(255,255,255,0.06)" }}
      >
        {panel.n}
      </div>
    </div>
  );
}

export default function WhatIBuild() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section>
      {/* Section label — white bg, readable before the panels */}
      <div
        ref={headRef}
        className="reveal max-w-6xl mx-auto px-6 pt-28 pb-16"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
          What I build
        </p>
        <h2
          className="font-sans font-black uppercase tracking-tight leading-[1.0]"
          style={{ fontSize: "clamp(2.8rem,7vw,7rem)", color: "#D4580A", maxWidth: "14ch" }}
        >
          Three ways to put the weapons to work.
        </h2>
      </div>

      {/* Three sticky full-screen panels */}
      <div ref={wrapperRef} style={{ position: "relative" }}>
        {panels.map((panel) => (
          <Panel key={panel.n} panel={panel} wrapperRef={wrapperRef} />
        ))}
      </div>

      {/* Spacer so next section isn't glued to the last sticky panel */}
      <div style={{ height: "8vh", backgroundColor: "#FFFFFF" }} />
    </section>
  );
}
