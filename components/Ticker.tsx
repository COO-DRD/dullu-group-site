"use client";

const STRIP =
  "KNOWLEDGE  ·  AUDACITY  ·  EMPIRE  ·  BUILT IN KILIFI, KENYA  ·  ONE PERSON, EVERY SYSTEM DOCUMENTED  ·  WEAPONS FOR AFRICAN FOUNDERS  ·  UNDER $100/MONTH IN TOOLS  ·  ";

export default function Ticker() {
  return (
    <div className="bg-ink-light border-b border-gold/20 py-2.5 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-[10px] font-semibold tracking-[0.28em] text-gold/55 uppercase shrink-0">
          {STRIP}
        </span>
        <span
          className="text-[10px] font-semibold tracking-[0.28em] text-gold/55 uppercase shrink-0"
          aria-hidden
        >
          {STRIP}
        </span>
      </div>
    </div>
  );
}
