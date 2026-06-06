"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/app/shop/page";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "./ProductCard";
import CheckoutModal from "./CheckoutModal";

const TABS = [
  { key: "all",       label: "All"       },
  { key: "freebie",   label: "Free"      },
  { key: "sme",       label: "SME"       },
  { key: "corporate", label: "Corporate" },
];

export function ShopClient({ products }: { products: Product[] }) {
  const [tab, setTab]         = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const { user }              = useAuth();

  const filtered = products.filter((p) => {
    if (tab === "all")     return true;
    if (tab === "freebie") return p.price_kes === 0;
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
          The Shop
        </h1>
        <p className="font-sans font-light text-lg" style={{ color: "#666666", maxWidth: "32rem" }}>
          Playbooks built for East African business reality.
          Start with a free download — no credit card, no friction.
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

      {/* Tabs */}
      <div
        className="flex gap-0 mb-10 border-b"
        style={{ borderColor: "#F0EDE8" }}
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-5 py-3 font-sans text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer border-b-2 -mb-px"
            style={{
              color:       tab === t.key ? "#D4580A" : "#888888",
              borderColor: tab === t.key ? "#D4580A" : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
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
