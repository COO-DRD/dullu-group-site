"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const socials = [
  { label: "YouTube",   href: "https://youtube.com/@Dr_Dullu" },
  { label: "Instagram", href: "https://instagram.com/dr.dullu_" },
  { label: "LinkedIn",  href: "https://ke.linkedin.com/in/drdullu" },
  { label: "TikTok",    href: "https://tiktok.com/@dr.dullu" },
];

export default function About() {
  const photoRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const section = photoRef.current;
    if (!section) return;
    let rafId: number;

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const offset = -rect.top * 0.25;
        section.style.backgroundPositionY = `calc(center + ${offset}px)`;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Full-screen landscape photo with overlaid text */}
      <section style={{ position: "relative" }}>
        <div
          ref={photoRef}
          style={{
            height: "100vh",
            backgroundImage: "url(/dr-landscape.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            position: "relative",
          }}
        >
          {/* Dark gradient overlay — heavier at bottom for legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.80) 100%)",
            }}
          />

          {/* Content anchored to bottom */}
          <div
            ref={contentRef}
            className="reveal"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 2rem 5rem",
              maxWidth: "72rem",
              margin: "0 auto",
            }}
          >
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em]"
              style={{ fontSize: "10px", color: "#D4580A", marginBottom: "1.25rem" }}
            >
              The story
            </p>

            <h2
              className="font-sans font-black uppercase tracking-tight leading-[1.0]"
              style={{ fontSize: "clamp(2.8rem,6.5vw,6.5rem)", color: "#F8F5EB", maxWidth: "18ch", marginBottom: "1.5rem" }}
            >
              One person. Every system documented.
            </h2>

            <p
              className="font-sans font-light leading-relaxed"
              style={{ color: "rgba(248,245,235,0.78)", maxWidth: "44rem", marginBottom: "0.75rem", fontSize: "1.05rem" }}
            >
              Ian Dullu is building a complete business operation from Kilifi, Kenya — automation agency,
              lead intelligence tool, digital product shop — all under $100/month in tools.
            </p>

            <p
              className="font-sans font-light leading-relaxed"
              style={{ color: "rgba(248,245,235,0.78)", maxWidth: "44rem", marginBottom: "2.5rem", fontSize: "1.05rem" }}
            >
              Every system. Every cost. Every failure. Published.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link
                href="/office"
                className="font-sans font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 inline-block"
                style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "11px", padding: "1rem 2.25rem" }}
              >
                Book a Call →
              </Link>

              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-medium transition-colors hover:opacity-100"
                  style={{ color: "rgba(248,245,235,0.65)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F8F5EB"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,245,235,0.65)"; }}
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video section — full-width reel */}
      <section style={{ backgroundColor: "#111111", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <p
            className="font-sans font-semibold uppercase tracking-[0.28em]"
            style={{ fontSize: "10px", color: "#D4580A", marginBottom: "1.25rem" }}
          >
            In action
          </p>
          <h2
            className="font-sans font-black uppercase tracking-tight leading-[1.0]"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)", color: "#F8F5EB", maxWidth: "16ch", marginBottom: "3rem" }}
          >
            Watch the build.
          </h2>
        </div>

        <div
          ref={videoRef}
          className="reveal"
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src="/dr-reel.mov"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div style={{ maxWidth: "72rem", margin: "2rem auto 0", padding: "0 2rem" }}>
          <Link
            href="/office"
            className="font-sans font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 inline-block"
            style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "11px", padding: "1rem 2.25rem", marginTop: "1rem" }}
          >
            Let&apos;s Talk →
          </Link>
        </div>
      </section>
    </>
  );
}
