"use client";

import { useState } from "react";
import type { Product } from "@/app/shop/page";
import ProductCard from "./ProductCard";
import CheckoutModal from "./CheckoutModal";

const TABS = [
  { key: "all",       label: "All" },
  { key: "freebie",   label: "Free" },
  { key: "sme",       label: "SME" },
  { key: "corporate", label: "Corporate" },
];

export function ShopClient({ products }: { products: Product[] }) {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = products.filter((p) => {
    if (tab === "all") return true;
    if (tab === "freebie") return p.category === "freebie";
    return p.audience === tab || p.audience === "both";
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4">
          DR.DULLU
        </p>
        <h1 className="font-black text-5xl md:text-6xl text-offwhite uppercase tracking-tight mb-4">
          The Shop
        </h1>
        <p className="font-light text-grey text-lg max-w-lg">
          Playbooks built for East African business reality. Start with a free download —
          no credit card, no friction.
        </p>
      </div>

      <div className="flex gap-0 mb-10 border-b border-gold/20">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer border-b-2 -mb-px ${
              tab === t.key
                ? "text-gold border-gold"
                : "text-grey border-transparent hover:text-offwhite"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-light text-grey">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onBuy={() => setSelected(p)} />
          ))}
        </div>
      )}

      {selected && (
        <CheckoutModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
