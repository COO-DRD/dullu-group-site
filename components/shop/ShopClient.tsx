"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import type { Product } from "@/app/shop/page";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "./ProductCard";
import CheckoutModal from "./CheckoutModal";

const SHOP_API = "https://dullu-shop-api.dullugroup.co.ke";

const TABS = [
  { key: "all",       label: "All"       },
  { key: "freebie",   label: "Free"      },
  { key: "coaches",   label: "Coaches"   },
  { key: "sme",       label: "SME"       },
  { key: "corporate", label: "Corporate" },
];

export function ShopClient({ products: initial }: { products: Product[] }) {
  const [tab, setTab]           = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(initial);
  const [loading, setLoading]   = useState(initial.length === 0);
  const { user }                = useAuth();

  // Sliding tab indicator
  const tabRefs                 = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd]           = useState({ left: 0, width: 0, ready: false });

  // Measure before first paint so there's no positional flash
  useLayoutEffect(() => {
    const el = tabRefs.current[0];
    if (!el) return;
    setInd({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, []);

  // Animate indicator on tab change
  useEffect(() => {
    const idx = TABS.findIndex((t) => t.key === tab);
    const el  = tabRefs.current[idx];
    if (!el) return;
    setInd({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [tab]);

  useEffect(() => {
    if (initial.length > 0) return;
    fetch(`${SHOP_API}/api/products`)
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initial.length]);

  const filtered = products.filter((p) => {
    if (tab === "all")     return true;
    if (tab === "freebie") return p.price_kes === 0;
    if (tab === "coaches") return p.audience === "coaches" || p.category === "coaches";
    return p.audience === tab || p.audience === "both";
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="mb-14">
        <p
          className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
          style={{ color: "#1B3D8F" }}
        >
          DR.DULLU
        </p>
        <h1
          className="font-sans font-black text-5xl md:text-6xl uppercase tracking-tight mb-4"
          style={{ color: "#D4580A" }}
        >
          The Library
        </h1>
        <p className="font-sans font-light text-lg" style={{ color: "#666666", maxWidth: "32rem" }}>
          Templates, scripts, and resources that go with the tools. Use the Cold Email Diagnostic
          first — then grab the templates that match what needs fixing.
        </p>

        {!user && (
          <p className="font-sans text-sm mt-4" style={{ color: "#888888" }}>
            <Link
              href="/register"
              className="font-medium hover:brightness-110"
              style={{ color: "#D4580A" }}
            >
              Join free
            </Link>{" "}
            to save your downloads to a personal dashboard.
          </p>
        )}
      </div>

      {/* Tabs with sliding indicator */}
      <div
        className="relative flex gap-0 mb-10 border-b"
        style={{ borderColor: "#F0EDE8" }}
      >
        {/* Sliding underline — animates between tabs */}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            height: 2,
            backgroundColor: "#D4580A",
            left: ind.left,
            width: ind.width,
            transition: ind.ready
              ? "left 200ms cubic-bezier(0.23,1,0.32,1), width 200ms cubic-bezier(0.23,1,0.32,1)"
              : "none",
          }}
        />
        {TABS.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => { tabRefs.current[i] = el; }}
            onClick={() => setTab(t.key)}
            className="btn-press px-5 py-3 font-sans text-[10px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
            style={{
              color:      tab === t.key ? "#D4580A" : "#888888",
              transition: "color 150ms ease",
              background: "none",
              border:     "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-24 flex justify-center">
          <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-sans font-light" style={{ color: "#888888" }}>No products found.</p>
        </div>
      ) : (
        <div className="border-t" style={{ borderColor: "#F0EDE8" }}>
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              allProducts={products}
              onBuy={() => setSelected(p)}
            />
          ))}
        </div>
      )}

      {selected && (
        <CheckoutModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
