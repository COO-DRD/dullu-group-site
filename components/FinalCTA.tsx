import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative bg-ink border-t border-gold/20 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="absolute bottom-0 right-0 text-[28vw] font-black text-gold/[0.025] pointer-events-none select-none leading-none tracking-tight uppercase" aria-hidden>
        GO
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block w-8 h-px bg-gold" />
          <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
            The audit is free
          </p>
          <span className="block w-8 h-px bg-gold" />
        </div>

        <h2 className="font-black text-5xl md:text-6xl lg:text-8xl text-offwhite uppercase leading-[0.92] tracking-tight mb-8">
          Ready to stop<br />
          <span className="text-gold">leaking money?</span>
        </h2>

        <p className="font-light text-grey text-lg mb-14 max-w-sm mx-auto leading-relaxed">
          Pick your weapon. Start free.
          No credit card. No pitch. Just systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="bg-gold text-ink font-bold text-sm tracking-[0.15em] uppercase px-10 py-5 hover:brightness-110 transition-all"
          >
            Enter the Shop →
          </Link>
          <Link
            href="/office"
            className="border border-gold/40 text-offwhite font-semibold text-sm tracking-[0.15em] uppercase px-10 py-5 hover:border-gold hover:text-gold transition-all"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
