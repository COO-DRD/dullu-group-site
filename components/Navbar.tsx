"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const TYAF_LINKS = [
  { label: "YouTube",   href: "https://www.youtube.com/@Dr_Dullu" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/drdullu/" },
  { label: "Instagram", href: "https://www.instagram.com/dr.dullu/" },
  { label: "Substack",  href: "https://drdullu.substack.com/" },
  { label: "Medium",    href: "https://medium.com/@dr.dullu" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [tyafOpen, setTyafOpen] = useState(false);
  const [solid, setSolid]       = useState(false);
  const { user, logout }        = useAuth();
  const rafRef                  = useRef<number>(0);
  const tyafRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setSolid(window.scrollY > 24));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close TYAF dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (tyafRef.current && !tyafRef.current.contains(e.target as Node)) {
        setTyafOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setOpen(false);
  }

  const navLinkStyle = { color: solid ? "#1B3D8F" : "rgba(248,245,235,0.80)" };
  const navLinkCls   = "font-sans text-sm font-medium transition-colors hover:text-amber";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: solid ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? "1px solid rgba(212,88,10,0.10)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="font-cinematic font-semibold tracking-[0.18em] uppercase transition-colors"
          style={{ fontSize: "1.35rem", color: solid ? "#D4580A" : "#F8F5EB" }}
        >
          DR.DULLU
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className={navLinkCls} style={navLinkStyle}>Shop</Link>

          {/* TYAF dropdown */}
          <div ref={tyafRef} className="relative">
            <button
              onClick={() => setTyafOpen((v) => !v)}
              className={`${navLinkCls} flex items-center gap-1 cursor-pointer`}
              style={navLinkStyle}
            >
              TYAF
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                className="transition-transform duration-200"
                style={{ transform: tyafOpen ? "rotate(180deg)" : "none", opacity: 0.6 }}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>

            {tyafOpen && (
              <div
                className="absolute top-full right-0 mt-3 w-72"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #F0EDE8",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: "#F0EDE8" }}>
                  <p className="font-sans font-bold text-sm leading-snug" style={{ color: "#111" }}>
                    The Young African Founder
                  </p>
                  <a
                    href="mailto:tyaf@dullugroup.co.ke"
                    className="font-sans text-[11px] mt-0.5 block hover:underline"
                    style={{ color: "#D4580A" }}
                  >
                    tyaf@dullugroup.co.ke
                  </a>
                </div>

                {/* Links */}
                <div className="py-2">
                  {TYAF_LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setTyafOpen(false)}
                      className="flex items-center justify-between px-5 py-2.5 transition-colors hover:bg-[#FAFAF8]"
                    >
                      <span className="font-sans text-sm font-medium" style={{ color: "#111" }}>{label}</span>
                      <span className="font-sans text-[10px]" style={{ color: "#CCC" }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="https://4unter.dullugroup.co.ke"
            target="_blank" rel="noopener noreferrer"
            className={navLinkCls} style={navLinkStyle}
          >
            4unter
          </a>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className={navLinkCls} style={navLinkStyle}>Dashboard</Link>
              <button
                onClick={handleLogout}
                className="font-sans font-bold text-[11px] tracking-[0.15em] uppercase px-5 py-2 border transition-all hover:brightness-110 cursor-pointer"
                style={{ borderColor: "#D4580A", color: "#D4580A" }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className={navLinkCls} style={navLinkStyle}>Sign In</Link>
              <Link
                href="/register"
                className="font-sans font-bold text-[11px] tracking-[0.15em] uppercase px-5 py-2 transition-all hover:brightness-110"
                style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
              >
                Join Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-0.5 transition-all duration-200"
              style={{
                backgroundColor: solid ? "#111111" : "#F8F5EB",
                transform:
                  i === 0 && open ? "rotate(45deg) translateY(8px)"
                  : i === 1 && open ? "scaleX(0)"
                  : i === 2 && open ? "rotate(-45deg) translateY(-8px)"
                  : "none",
                opacity: i === 1 && open ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "rgba(255,255,255,0.97)", borderColor: "rgba(212,88,10,0.10)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-5">
            <Link href="/shop" onClick={() => setOpen(false)} className="font-sans text-sm font-medium text-ink hover:text-amber transition-colors">
              Shop
            </Link>

            {/* TYAF mobile section */}
            <div>
              <button
                onClick={() => setTyafOpen((v) => !v)}
                className="flex items-center gap-2 font-sans text-sm font-medium text-ink hover:text-amber transition-colors cursor-pointer w-full text-left"
              >
                The Young African Founder
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                  className="transition-transform duration-200"
                  style={{ transform: tyafOpen ? "rotate(180deg)" : "none", opacity: 0.5 }}
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>

              {tyafOpen && (
                <div className="mt-3 pl-3 flex flex-col gap-3 border-l-2" style={{ borderColor: "#D4580A" }}>
                  <a
                    href="mailto:tyaf@dullugroup.co.ke"
                    className="font-sans text-[11px]"
                    style={{ color: "#D4580A" }}
                  >
                    tyaf@dullugroup.co.ke
                  </a>
                  {TYAF_LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank" rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="font-sans text-sm font-medium text-ink hover:text-amber transition-colors"
                    >
                      {label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://4unter.dullugroup.co.ke"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="font-sans text-sm font-medium text-ink hover:text-amber transition-colors"
            >
              4unter ↗
            </a>

            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="font-sans text-sm font-medium text-royal hover:text-amber transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-left font-sans text-sm font-medium text-muted hover:text-amber transition-colors cursor-pointer">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="font-sans text-sm font-medium text-ink hover:text-amber transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="inline-block font-bold text-[11px] tracking-[0.15em] uppercase px-6 py-3 text-center"
                  style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
                >
                  Join Free →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
