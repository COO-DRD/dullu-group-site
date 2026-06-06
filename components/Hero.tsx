"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Hero() {
  const textRef  = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ctaRef   = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    function tick() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const raw = Math.min(1, scrollY / (vh * 0.8));
      const p   = ease(raw);

      if (textRef.current) {
        const startX = vw * 0.07;
        const startY = vh * 0.80;
        const endX   = vw * 0.50;
        const endY   = vh * 0.50;
        const x      = startX + (endX - startX) * p;
        const y      = startY + (endY - startY) * p;
        const scale  = 0.065 + (1 - 0.065) * p;
        textRef.current.style.transform =
          `translate(${x}px,${y}px) translate(-50%,-50%) scale(${scale})`;
      }

      if (photoRef.current) {
        photoRef.current.style.transform =
          `scale(1.03) translateY(${scrollY * 0.35}px)`;
      }

      if (ctaRef.current) {
        const a = Math.max(0, (raw - 0.55) / 0.45);
        ctaRef.current.style.opacity   = String(a);
        ctaRef.current.style.transform = `translateY(${(1 - a) * 18}px)`;
      }

      if (nudgeRef.current) {
        nudgeRef.current.style.opacity = String(Math.max(0, 1 - raw * 4));
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div style={{ height: "185vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Photo — wide shot showing full upper body and shoulders */}
        <div
          ref={photoRef}
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "scale(1.03) translateY(0px)",
            animation: "photo-breathe 1.6s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <Image
            src="/dr-wide.jpg"
            fill
            alt="Dr. Dullu"
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            priority
            quality={100}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top,rgba(0,0,0,0.50) 0%,transparent 55%)",
            }}
          />
        </div>

        {/* DR.DULLU — suit pocket → center */}
        <div
          ref={textRef}
          className="absolute top-0 left-0 pointer-events-none will-change-transform select-none"
          style={{
            transform: "translate(7vw,80vh) translate(-50%,-50%) scale(0.065)",
            transformOrigin: "center center",
            animation: "pocket-appear 1.1s 0.6s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <span
            className="font-cinematic leading-none tracking-[0.18em] whitespace-nowrap"
            style={{
              fontSize: "clamp(7rem,14vw,18rem)",
              color: "#F8F5EB",
              fontWeight: 600,
            }}
          >
            DR.DULLU
          </span>
        </div>

        {/* CTA — appears after text reaches center */}
        <div
          ref={ctaRef}
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 will-change-transform"
          style={{ opacity: 0 }}
        >
          <p
            className="font-sans text-[10px] tracking-[0.38em] uppercase font-light"
            style={{ color: "#F8F5EB", opacity: 0.7 }}
          >
            Kilifi, Kenya · Built in Public
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="font-sans font-bold text-[11px] tracking-[0.22em] uppercase px-9 py-4 transition-all hover:brightness-110"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
            >
              Get the Playbooks →
            </Link>
            <Link
              href="/office"
              className="font-sans font-semibold text-[11px] tracking-[0.22em] uppercase px-9 py-4 border transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(248,245,235,0.6)", color: "#F8F5EB" }}
            >
              Book a Call
            </Link>
          </div>
        </div>

        {/* Scroll nudge */}
        <div
          ref={nudgeRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ color: "#F8F5EB", opacity: 0.45 }}>
            Scroll
          </span>
          <span className="block w-px" style={{ height: 34, background: "linear-gradient(to bottom,rgba(248,245,235,0.5),transparent)" }} />
        </div>

      </div>
    </div>
  );
}
