import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-10">
          Built in Public · Kilifi, Kenya
        </p>

        <h1 className="font-sans font-black text-5xl md:text-6xl lg:text-7xl text-offwhite leading-[1.05] mb-6 max-w-3xl uppercase tracking-tight">
          You don&apos;t need a big budget to build big systems.
        </h1>

        <p className="font-sans font-extrabold text-2xl md:text-3xl text-gold mb-10 uppercase tracking-wide">
          You need the right weapons.
        </p>

        <p className="font-sans font-light text-lg text-grey leading-relaxed mb-14 max-w-lg">
          One person. Nairobi. Building an automation agency, lead intelligence tool,
          and digital product shop — all under $100/month in tools.
          Everything documented as it gets built.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="bg-gold text-ink font-bold text-sm tracking-[0.1em] uppercase px-8 py-4 hover:brightness-110 transition-all"
          >
            Get the Playbooks →
          </Link>
          <Link
            href="/office"
            className="border border-gold text-gold font-bold text-sm tracking-[0.1em] uppercase px-8 py-4 hover:bg-gold hover:text-ink transition-all"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </section>
  );
}
