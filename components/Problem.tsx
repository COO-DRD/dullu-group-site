"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const leaks = [
  {
    n:    "01",
    title: "The Response Gap",
    body:  "Leads message you and buy from your competitor before you reply. Every hour of silence is a closed deal somewhere else.",
    cta:   "Fix this →",
    href:  "/shop",
  },
  {
    n:    "02",
    title: "The Proposal Problem",
    body:  "Quotes sent over WhatsApp chat. They scroll past it. You never had a real chance.",
    cta:   "See the fix →",
    href:  "/shop",
  },
  {
    n:    "03",
    title: "The Silent Quote",
    body:  "The deal didn't die because they said no. It died because you never followed up.",
    cta:   "Automate follow-up →",
    href:  "/shop",
  },
  {
    n:    "04",
    title: "The One-Transaction Client",
    body:  "Clients who bought once and never heard from you again. Not because they left — because you never came back.",
    cta:   "Build retention →",
    href:  "/shop",
  },
  {
    n:    "05",
    title: "The Empty Review Page",
    body:  "Happy clients who never left a review because you never asked. Your next client is reading a blank page.",
    cta:   "Start collecting →",
    href:  "/shop",
  },
  {
    n:    "06",
    title: "The Time Drain",
    body:  "Two or more hours every day on work automation handles in seconds. You are paying yourself to do a robot's job.",
    cta:   "Get the system →",
    href:  "/shop",
  },
];

function LeakRow({ leak, index }: { leak: typeof leaks[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className="reveal border-b py-16 md:py-20 px-6"
      style={{
        borderColor: "#F0EDE8",
        transitionDelay: `${index * 0.04}s`,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Number + divider */}
        <div className="flex items-center gap-5">
          <span
            className="font-cinematic font-light leading-none select-none"
            style={{ fontSize: "clamp(3rem,7vw,6rem)", color: "#F0EDE8" }}
          >
            {leak.n}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#F0EDE8" }} />
        </div>

        {/* Title */}
        <h3
          className="font-sans font-black uppercase tracking-tight leading-tight"
          style={{ fontSize: "clamp(1.8rem,4.5vw,4rem)", color: "#111111" }}
        >
          {leak.title}
        </h3>

        {/* Body + CTA row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p
            className="font-sans font-light text-lg leading-relaxed"
            style={{ color: "#555555", maxWidth: "42rem" }}
          >
            {leak.body}
          </p>
          <Link
            href={leak.href}
            className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-7 py-3 shrink-0 border transition-all hover:brightness-110 inline-block"
            style={{ borderColor: "#D4580A", color: "#D4580A" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#D4580A";
              (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#D4580A";
            }}
          >
            {leak.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  const headRef = useRef<HTMLDivElement>(null);

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
    <section style={{ backgroundColor: "#FFFFFF" }}>

      {/* Section header */}
      <div ref={headRef} className="reveal max-w-6xl mx-auto px-6 pt-28 pb-16">
        <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
          Where the money is going
        </p>
        <h2
          className="font-sans font-black uppercase tracking-tight leading-[1.0]"
          style={{ fontSize: "clamp(2.8rem,7vw,7rem)", color: "#D4580A", maxWidth: "16ch" }}
        >
          Most businesses don&apos;t have a product problem.
        </h2>
      </div>

      {/* Full-width photo break — the wide studio shot */}
      <div className="w-full overflow-hidden" style={{ height: "55vh" }}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(/dr-wide.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            backgroundAttachment: "fixed",
          }}
        />
      </div>

      {/* Six leaks — full-width editorial rows */}
      <div>
        {leaks.map((leak, i) => (
          <LeakRow key={leak.n} leak={leak} index={i} />
        ))}
      </div>

      {/* Section footer CTA */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link
          href="/shop?product=african-business-audit"
          className="font-sans font-bold text-[11px] tracking-[0.22em] uppercase px-10 py-5 inline-block transition-all hover:brightness-110"
          style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
        >
          Take the free 2-minute audit →
        </Link>
      </div>

    </section>
  );
}
