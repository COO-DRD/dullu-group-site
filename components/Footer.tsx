import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bean py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-bold text-cognac mb-3">DR.DULLU</p>
            <p className="text-sm text-bean-faint leading-relaxed max-w-xs">
              Weapons for African founders. Playbooks, automation systems, and lead intelligence
              built for East African business reality.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-cognac mb-5">Products</p>
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="text-sm text-bean-faint hover:text-cognac transition-colors">
                Shop
              </Link>
              <a
                href="https://digital.dullugroup.co.ke"
                className="text-sm text-bean-faint hover:text-cognac transition-colors"
              >
                Dullu Digital
              </a>
              <a
                href="https://4unter.dullugroup.co.ke"
                className="text-sm text-bean-faint hover:text-cognac transition-colors"
              >
                4unter
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-cognac mb-5">Connect</p>
            <div className="flex flex-col gap-3">
              <Link href="/office" className="text-sm text-bean-faint hover:text-cognac transition-colors">
                Book a Call
              </Link>
              <Link href="/articles" className="text-sm text-bean-faint hover:text-cognac transition-colors">
                Articles
              </Link>
              <a
                href="https://youtube.com/@Dr_Dullu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bean-faint hover:text-cognac transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-bean-subtle pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-bean-muted">© 2026 DR.DULLU · KILIFI, KENYA</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-bean-muted hover:text-cognac transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-bean-muted hover:text-cognac transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-xs text-bean-muted hover:text-cognac transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
