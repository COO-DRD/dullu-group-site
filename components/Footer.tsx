import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink-light py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo-mark.svg" alt="DR.DULLU mark" width={28} height={28} />
              <span className="font-semibold text-sm tracking-[0.15em] text-gold uppercase">DR. DULLU</span>
            </div>
            <p className="font-extralight text-sm text-grey leading-relaxed max-w-xs">
              Knowledge. Audacity. Empire.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">Products</p>
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="text-sm font-light text-grey hover:text-gold transition-colors">
                Shop
              </Link>
              <a href="https://digital.dullugroup.co.ke" className="text-sm font-light text-grey hover:text-gold transition-colors">
                Dullu Digital
              </a>
              <a href="https://4unter.dullugroup.co.ke" className="text-sm font-light text-grey hover:text-gold transition-colors">
                4unter
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">Connect</p>
            <div className="flex flex-col gap-3">
              <Link href="/office" className="text-sm font-light text-grey hover:text-gold transition-colors">
                Book a Call
              </Link>
              <Link href="/articles" className="text-sm font-light text-grey hover:text-gold transition-colors">
                Articles
              </Link>
              <a href="https://youtube.com/@Dr_Dullu" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-grey hover:text-gold transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs font-light text-grey/50">© 2026 DR.DULLU · KILIFI, KENYA</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs font-light text-grey/50 hover:text-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs font-light text-grey/50 hover:text-gold transition-colors">Terms</Link>
            <Link href="/contact" className="text-xs font-light text-grey/50 hover:text-gold transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
