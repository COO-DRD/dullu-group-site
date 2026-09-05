import Link from "next/link";

const CONTACT = [
  { label: "partners@dullugroup.co.ke", href: "mailto:partners@dullugroup.co.ke" },
  { label: "cal.com/dr.dullu", href: "https://cal.com/dr.dullu", ext: true },
  { label: "+254 723 756 835", href: "tel:+254723756835" },
];

const ELSEWHERE = [
  { label: "YouTube", href: "https://youtube.com/@Dr_Dullu" },
  { label: "Instagram", href: "https://instagram.com/dr.dullu/" },
  { label: "TikTok", href: "https://tiktok.com/@dr.dullu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drdullu/" },
  { label: "The Managed Run", href: "https://digital.dullugroup.co.ke" },
];

export default function HomeFooter() {
  return (
    <footer style={{ backgroundColor: "#111111", color: "#F8F5EB" }}>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-cinematic font-bold mb-1" style={{ fontSize: "1.7rem", color: "#FFFFFF", letterSpacing: "0.04em" }}>
              DR.DULLU
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(248,245,235,0.7)" }}>
              Ian Dullu
              <br />
              Mombasa, Kenya
              <br />
              Working across East Africa and remotely
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] mt-4" style={{ color: "rgba(248,245,235,0.45)" }}>
              Knowledge. Audacity. Empire.
            </p>
          </div>

          <div>
            <p
              className="font-sans text-xs font-bold uppercase tracking-[0.22em] mb-5"
              style={{ color: "#D4580A" }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-3">
              {CONTACT.map((item) =>
                item.ext ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm inline-flex items-center min-h-[44px] py-3 transition-colors hover:text-amber"
                    style={{ color: "rgba(248,245,235,0.8)", textDecoration: "none" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-sans text-sm inline-flex items-center min-h-[44px] py-3 transition-colors hover:text-amber"
                    style={{ color: "rgba(248,245,235,0.8)", textDecoration: "none" }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <p
              className="font-sans text-xs font-bold uppercase tracking-[0.22em] mb-5"
              style={{ color: "#D4580A" }}
            >
              Elsewhere
            </p>
            <div className="flex flex-col gap-3">
              {ELSEWHERE.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm inline-flex items-center min-h-[44px] py-3 transition-colors hover:text-amber"
                  style={{ color: "rgba(248,245,235,0.8)", textDecoration: "none" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(248,245,235,0.15)" }}
        >
          <p className="font-sans text-xs" style={{ color: "rgba(248,245,235,0.5)" }}>
            © 2026 Ian Dullu · Mombasa, Kenya
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/terms"
              className="font-sans text-xs inline-flex items-center min-h-[44px] py-3 transition-colors"
              style={{ color: "rgba(248,245,235,0.5)", textDecoration: "none" }}
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="font-sans text-xs inline-flex items-center min-h-[44px] py-3 transition-colors"
              style={{ color: "rgba(248,245,235,0.5)", textDecoration: "none" }}
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}