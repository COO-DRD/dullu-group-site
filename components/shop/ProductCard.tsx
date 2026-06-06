"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/app/shop/page";
import type { RecProduct } from "@/app/api/shop/recs/[slug]/route";

const SHOP_API = "https://dullu-shop-api.dullugroup.co.ke";

interface ExtendedProduct extends Product {
  description?: string;
  features?: string[];
  what_you_get?: string[];
}

export default function ProductCard({
  product,
  index,
  onBuy,
}: {
  product: Product;
  index: number;
  allProducts: Product[]; // kept in signature for ShopClient compat, not needed now
  onBuy: () => void;
}) {
  const isFree = product.price_kes === 0;
  const audienceLabel =
    product.audience === "sme"        ? "SME"
    : product.audience === "corporate" ? "Corporate"
    : "All";
  const n = String(index + 1).padStart(2, "0");

  const [open, setOpen]             = useState(false);
  const [details, setDetails]       = useState<ExtendedProduct | null>(null);
  const [recs, setRecs]             = useState<RecProduct[]>([]);
  const [loading, setLoading]       = useState(false);
  const [fetched, setFetched]       = useState(false);

  useEffect(() => {
    if (!open || fetched) return;
    setLoading(true);
    setFetched(true);

    Promise.allSettled([
      fetch(`${SHOP_API}/api/products/${product.slug}`).then((r) => r.ok ? r.json() : null),
      fetch(`/api/shop/recs/${product.slug}`).then((r) => r.json()),
    ]).then(([detRes, recRes]) => {
      if (detRes.status === "fulfilled" && detRes.value) {
        setDetails(detRes.value as ExtendedProduct);
      }
      if (recRes.status === "fulfilled") {
        const { recs: r } = recRes.value as { recs: RecProduct[] };
        setRecs(r ?? []);
      }
      setLoading(false);
    });
  }, [open, fetched, product.slug]);

  const display = details ?? product;

  return (
    <div
      className="border-b transition-colors"
      style={{ borderColor: "#F0EDE8", backgroundColor: open ? "#FAFAF8" : "#FFFFFF" }}
      onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLDivElement).style.backgroundColor = "#FFF8F4"; }}
      onMouseLeave={(e) => { if (!open) (e.currentTarget as HTMLDivElement).style.backgroundColor = "#FFFFFF"; }}
    >
      {/* Collapsed row — click to expand */}
      <button
        className="w-full text-left py-16 md:py-20 px-6 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-6">

          {/* Number + tags */}
          <div className="flex items-center gap-5">
            <span
              className="font-cinematic font-light leading-none select-none"
              style={{ fontSize: "clamp(3rem,7vw,6rem)", color: "#F0EDE8" }}
            >
              {n}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#F0EDE8" }} />
            <span className="font-sans font-semibold tracking-[0.18em] uppercase" style={{ fontSize: "10px", color: "#1B3D8F" }}>
              {audienceLabel}
            </span>
            <span
              className="font-sans font-semibold tracking-[0.12em] uppercase px-2 py-1 shrink-0"
              style={isFree
                ? { backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "10px" }
                : { border: "1px solid #D4580A", color: "#D4580A", fontSize: "10px" }}
            >
              {isFree ? "Free" : `KES ${product.price_kes.toLocaleString()}`}
            </span>
          </div>

          {/* Title + expand toggle */}
          <div className="flex items-start justify-between gap-4">
            <h3
              className="font-sans font-black uppercase tracking-tight leading-tight"
              style={{ fontSize: "clamp(1.8rem,4.5vw,4rem)", color: "#111111" }}
            >
              {product.title}
            </h3>
            <span
              className="shrink-0 mt-2 font-light transition-transform duration-300"
              style={{ fontSize: "1.6rem", color: "#D4580A", lineHeight: 1, display: "block",
                transform: open ? "rotate(45deg)" : "none" }}
            >
              +
            </span>
          </div>

          {/* Tagline + ghost CTA — collapsed only */}
          {!open && (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <p className="font-sans font-light text-lg leading-relaxed" style={{ color: "#555555", maxWidth: "42rem" }}>
                {product.tagline}
              </p>
              <span
                className="font-sans font-bold tracking-[0.2em] uppercase px-7 py-3 shrink-0 border"
                style={{ borderColor: "#D4580A", color: "#D4580A", fontSize: "11px" }}
              >
                {isFree ? "Get for Free →" : "Buy Now →"}
              </span>
            </div>
          )}
        </div>
      </button>

      {/* Expanded panel */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "3000px" : "0px",
          transition: "max-height 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 pb-16" style={{ borderTop: "1px solid #F0EDE8" }}>

          {loading ? (
            <div className="py-12 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
              <span className="font-sans text-sm" style={{ color: "#AAAAAA" }}>Loading…</span>
            </div>
          ) : (
            <div className="pt-12 flex flex-col gap-12">

              {/* Description */}
              <p className="font-sans font-light text-lg leading-relaxed" style={{ color: "#444444", maxWidth: "52rem" }}>
                {(display as ExtendedProduct).description ?? product.tagline}
              </p>

              {/* What's inside */}
              {(display as ExtendedProduct).features?.length ? (
                <div>
                  <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color: "#1B3D8F" }}>
                    What&apos;s inside
                  </p>
                  <ul className="flex flex-col gap-4">
                    {(display as ExtendedProduct).features!.map((f, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span style={{ color: "#D4580A", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                        <span className="font-sans font-light text-base leading-relaxed" style={{ color: "#333333" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* You get */}
              {(display as ExtendedProduct).what_you_get?.length ? (
                <div>
                  <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color: "#1B3D8F" }}>
                    You get
                  </p>
                  <ul className="flex flex-col gap-4">
                    {(display as ExtendedProduct).what_you_get!.map((w, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span style={{ color: "#D4580A", flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                        <span className="font-sans font-light text-base leading-relaxed" style={{ color: "#333333" }}>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Recommendations — always rendered when data arrives */}
              {recs.length > 0 && (
                <div>
                  <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "#D4580A" }}>
                    Pair it with
                  </p>
                  <div className="mt-5 border-t" style={{ borderColor: "#F0EDE8" }}>
                    {recs.map((rec) => (
                      <div
                        key={rec.slug}
                        className="flex items-start justify-between gap-6 py-6 border-b"
                        style={{ borderColor: "#F0EDE8" }}
                      >
                        <div className="flex flex-col gap-1 min-w-0">
                          {/* Reason label */}
                          <span
                            className="font-sans font-semibold tracking-[0.16em] uppercase"
                            style={{ fontSize: "9px",
                              color: rec.reason_type === "copurchase" ? "#1B3D8F" : "#AAAAAA" }}
                          >
                            {rec.reason}
                          </span>
                          <p className="font-sans font-bold text-base leading-snug" style={{ color: "#111111" }}>
                            {rec.title}
                          </p>
                          <p className="font-sans font-light text-sm leading-snug mt-0.5" style={{ color: "#888888" }}>
                            {rec.tagline}
                          </p>
                        </div>
                        <span
                          className="shrink-0 self-center font-sans font-semibold tracking-[0.1em] uppercase px-2 py-1"
                          style={rec.price_kes === 0
                            ? { backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "10px" }
                            : { border: "1px solid #D4580A", color: "#D4580A", fontSize: "10px" }}
                        >
                          {rec.price_kes === 0 ? "Free" : `KES ${rec.price_kes.toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary CTA */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onBuy(); }}
                  className="font-sans font-bold tracking-[0.2em] uppercase px-9 py-4 transition-all hover:brightness-110 cursor-pointer"
                  style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "11px" }}
                >
                  {isFree ? "Download for Free →" : `Buy for KES ${product.price_kes.toLocaleString()} →`}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
