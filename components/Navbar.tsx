"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [solid, setSolid]     = useState(false);
  const { user, logout }      = useAuth();
  const rafRef                = useRef<number>(0);

  useEffect(() => {
    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setSolid(window.scrollY > 24));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await logout();
    setOpen(false);
  }

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
          style={{
            fontSize: "1.35rem",
            color: solid ? "#D4580A" : "#F8F5EB",
          }}
        >
          DR.DULLU
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Shop",     href: "/shop" },
            { label: "YouTube",  href: "https://youtube.com/@Dr_Dullu", ext: true },
            { label: "4unter",   href: "https://4unter.dullugroup.co.ke", ext: true },
          ].map(({ label, href, ext }) => (
            ext ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-medium transition-colors hover:text-amber"
                style={{ color: solid ? "#1B3D8F" : "rgba(248,245,235,0.80)" }}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className="font-sans text-sm font-medium transition-colors hover:text-amber"
                style={{ color: solid ? "#1B3D8F" : "rgba(248,245,235,0.80)" }}
              >
                {label}
              </Link>
            )
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="font-sans text-sm font-medium transition-colors hover:text-amber"
                style={{ color: solid ? "#1B3D8F" : "rgba(248,245,235,0.80)" }}
              >
                Dashboard
              </Link>
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
              <Link
                href="/login"
                className="font-sans text-sm font-medium transition-colors hover:text-amber"
                style={{ color: solid ? "#1B3D8F" : "rgba(248,245,235,0.80)" }}
              >
                Sign In
              </Link>
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
          style={{
            backgroundColor: "rgba(255,255,255,0.97)",
            borderColor: "rgba(212,88,10,0.10)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-5">
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="font-sans text-sm font-medium text-ink hover:text-amber transition-colors"
            >
              Shop
            </Link>
            {[
              { label: "YouTube", href: "https://youtube.com/@Dr_Dullu" },
              { label: "4unter",  href: "https://4unter.dullugroup.co.ke" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-medium text-ink hover:text-amber transition-colors"
                onClick={() => setOpen(false)}
              >
                {label} ↗
              </a>
            ))}

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="font-sans text-sm font-medium text-royal hover:text-amber transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left font-sans text-sm font-medium text-muted hover:text-amber transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="font-sans text-sm font-medium text-ink hover:text-amber transition-colors"
                >
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
