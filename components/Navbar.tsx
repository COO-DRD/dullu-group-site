"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-mark.svg" alt="DR.DULLU mark" width={32} height={32} />
          <span className="font-sans font-semibold text-sm tracking-[0.15em] text-gold uppercase">
            DR. DULLU
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm font-medium text-grey hover:text-offwhite transition-colors">
            Shop
          </Link>
          <Link href="/articles" className="text-sm font-medium text-grey hover:text-offwhite transition-colors">
            Articles
          </Link>
          <a href="https://4unter.dullugroup.co.ke" className="text-sm font-medium text-grey hover:text-offwhite transition-colors">
            4unter
          </a>
          <Link
            href="/office"
            className="text-sm font-semibold bg-gold text-ink px-5 py-2 hover:brightness-110 transition-all"
          >
            Book a Call
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-offwhite transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-offwhite transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-offwhite transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold/20 bg-ink-light">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-5">
            <Link href="/shop" onClick={() => setOpen(false)} className="text-grey hover:text-offwhite transition-colors">
              Shop
            </Link>
            <Link href="/articles" onClick={() => setOpen(false)} className="text-grey hover:text-offwhite transition-colors">
              Articles
            </Link>
            <a href="https://4unter.dullugroup.co.ke" onClick={() => setOpen(false)} className="text-grey hover:text-offwhite transition-colors">
              4unter
            </a>
            <Link
              href="/office"
              onClick={() => setOpen(false)}
              className="inline-block bg-gold text-ink font-semibold px-5 py-3 text-center hover:brightness-110 transition-all"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
