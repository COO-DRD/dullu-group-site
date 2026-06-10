"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";

const leaks = [
  {
    n:    "01",
    title: "The Manual Onboarding",
    body:  "Every new client means hours of manual setup. Sending login details, intake forms, welcome emails by hand. One at a time. Every time.",
    cta:   "Automate it",
    href:  "/office",
  },
  {
    n:    "02",
    title: "The Tool Chaos",
    body:  "Kajabi for courses. Stripe for payments. Calendly for calls. ConvertKit for email. Slack for clients. None of them talk to each other.",
    cta:   "Connect the stack",
    href:  "/office",
  },
  {
    n:    "03",
    title: "The Booking Black Hole",
    body:  "Lead books a call. Gets a Calendly confirmation. Then silence. No nurture, no reminder, no follow-up if they ghost. You lose 30-40% there.",
    cta:   "Fix the flow",
    href:  "/office",
  },
  {
    n:    "04",
    title: "The Capacity Ceiling",
    body:  "You cannot take another client without working more hours. The system cannot scale — so neither can you.",
    cta:   "Break the ceiling",
    href:  "/office",
  },
  {
    n:    "05",
    title: "The Invisible Offboarding",
    body:  "Program ends. Client disappears. No testimonial request, no referral ask, no upsell. Free revenue left on the table every single time.",
    cta:   "Capture it",
    href:  "/office",
  },
  {
    n:    "06",
    title: "The GHL Trap",
    body:  "An agency sold you a sales funnel dressed as a coaching system. It runs your marketing. It does not run your business.",
    cta:   "See what a real system looks like",
    href:  "/office",
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
          Most coaches don&apos;t have a delivery problem.
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
          href="/office"
          className="font-sans font-bold text-[11px] tracking-[0.22em] uppercase px-10 py-5 inline-block transition-all hover:brightness-110"
          style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
        >
          Book a free system audit call <Arr />
        </Link>
      </div>

    </section>
  );
}
