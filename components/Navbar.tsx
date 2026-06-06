"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-sm border-b border-cognac/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-bold text-cognac tracking-tight"
        >
          DR.DULLU
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm text-bean-muted hover:text-cognac transition-colors">
            Shop
          </Link>
          <Link href="/articles" className="text-sm text-bean-muted hover:text-cognac transition-colors">
            Articles
          </Link>
          <Link href="https://4unter.dullugroup.co.ke" className="text-sm text-bean-muted hover:text-cognac transition-colors">
            4unter
          </Link>
          <Link
            href="/office"
            className="text-sm bg-cognac text-parchment px-5 py-2 hover:bg-cognac-light transition-colors"
          >
            Book a Call
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-bean transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-bean transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-bean transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cognac/20 bg-parchment">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-5">
            <Link href="/shop" onClick={() => setOpen(false)} className="text-bean-muted hover:text-cognac transition-colors">
              Shop
            </Link>
            <Link href="/articles" onClick={() => setOpen(false)} className="text-bean-muted hover:text-cognac transition-colors">
              Articles
            </Link>
            <Link href="https://4unter.dullugroup.co.ke" onClick={() => setOpen(false)} className="text-bean-muted hover:text-cognac transition-colors">
              4unter
            </Link>
            <Link
              href="/office"
              onClick={() => setOpen(false)}
              className="inline-block bg-cognac text-parchment px-5 py-3 text-center hover:bg-cognac-light transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
