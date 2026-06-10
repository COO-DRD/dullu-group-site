"use client";

import { useState, useEffect } from "react";
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
          The Shop
        </h1>
        <p className="font-sans font-light text-lg" style={{ color: "#666666", maxWidth: "32rem" }}>
          Playbooks and system guides for coaches, consultants, and business operators.
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
