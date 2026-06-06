import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 border-b border-cognac/20">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs tracking-[0.2em] text-cognac uppercase mb-10">
          Built in Public · Kilifi, Kenya
        </p>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-bean leading-[1.08] mb-6 max-w-3xl">
          You don&apos;t need a big budget to build big systems.
        </h1>

        <p className="font-display text-2xl md:text-3xl text-cognac italic mb-10">
          You need the right weapons.
        </p>

        <p className="text-lg text-bean-muted leading-relaxed mb-14 max-w-lg">
          One person. Nairobi. Building an automation agency, lead intelligence tool,
          and digital product shop — all under $100/month in tools.
          Everything documented as it gets built.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="bg-cognac text-parchment px-8 py-4 text-sm tracking-wide hover:bg-cognac-light transition-colors"
          >
            Get the Playbooks →
          </Link>
          <Link
            href="/office"
            className="border border-cognac text-cognac px-8 py-4 text-sm tracking-wide hover:bg-cognac hover:text-parchment transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </section>
  );
}
