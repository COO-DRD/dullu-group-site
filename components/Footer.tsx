import Link from "next/link";

const products = [
  { label: "Shop",         href: "/shop",                              ext: false },
  { label: "Dullu Digital", href: "https://digital.dullugroup.co.ke", ext: true  },
  { label: "4unter",       href: "https://4unter.dullugroup.co.ke",   ext: true  },
];

const connect = [
  { label: "Book a Call", href: "/office",                          ext: false },
  { label: "YouTube",     href: "https://youtube.com/@Dr_Dullu",    ext: true  },
  { label: "Instagram",   href: "https://instagram.com/dr.dullu_",  ext: true  },
  { label: "TikTok",      href: "https://tiktok.com/@dr.dullu",     ext: true  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #F0EDE8" }}>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <span
              className="font-cinematic font-semibold tracking-[0.18em] uppercase block mb-3"
              style={{ fontSize: "1.6rem", color: "#D4580A" }}
            >
              DR.DULLU
            </span>
            <p className="font-sans font-light text-sm leading-relaxed" style={{ color: "#666666", maxWidth: 260 }}>
              Knowledge. Audacity. Empire.
              <br />
              Built in public from Kilifi, Kenya.
            </p>
          </div>

          <div>
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase mb-5"
              style={{ color: "#D4580A" }}
            >
              Products
            </p>
            <div className="flex flex-col gap-3">
              {products.map(({ label, href, ext }) =>
                ext ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-light text-sm transition-colors hover:text-amber"
                    style={{ color: "#666666" }}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    className="font-sans font-light text-sm transition-colors hover:text-amber"
                    style={{ color: "#666666" }}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase mb-5"
              style={{ color: "#D4580A" }}
            >
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {connect.map(({ label, href, ext }) =>
                ext ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-light text-sm transition-colors hover:text-amber"
                    style={{ color: "#666666" }}
                  >
                    {label} ↗
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    className="font-sans font-light text-sm transition-colors hover:text-amber"
                    style={{ color: "#666666" }}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #F0EDE8" }}
        >
          <p className="font-sans text-xs font-light" style={{ color: "#AAAAAA" }}>
            © 2026 DR.DULLU · KILIFI, KENYA
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/terms"
              className="font-sans text-xs font-light transition-colors hover:text-amber"
              style={{ color: "#AAAAAA" }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="font-sans text-xs font-light transition-colors hover:text-amber"
              style={{ color: "#AAAAAA" }}
            >
              Privacy Policy
            </Link>
            <a
              href="mailto:shop@dullugroup.co.ke"
              className="font-sans text-xs font-light transition-colors hover:text-amber"
              style={{ color: "#AAAAAA" }}
            >
              shop@dullugroup.co.ke
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
