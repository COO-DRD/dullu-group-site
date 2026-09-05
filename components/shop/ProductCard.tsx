"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";
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
  allProducts: Product[]; // kept in signature for ShopClient compat
  onBuy: () => void;
}) {
  const isFree = product.price_kes === 0;
  const audienceLabel =
    product.audience === "sme"        ? "SME"
    : product.audience === "corporate" ? "Corporate"
    : product.audience === "coaches"   ? "Coaches"
    : "All";
  const n = String(index + 1).padStart(2, "0");

  const [open, setOpen]       = useState(false);
  const [details, setDetails] = useState<ExtendedProduct | null>(null);
  const [recs, setRecs]       = useState<RecProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

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
      className="border-b"
      style={{ borderColor: "#F0EDE8" }}
    >
      {/* Collapsed row */}
      <div className="flex items-start gap-3 py-5">

        {/* Left: toggle — index + title + tagline */}
        <button
          className="flex-1 min-w-0 text-left cursor-pointer flex items-start gap-3"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span
            className="font-sans font-light shrink-0 mt-0.5 select-none"
            style={{ fontSize: "11px", color: "#CCCCCC", minWidth: "1.6rem" }}
          >
            {n}
          </span>
          <div className="min-w-0">
            <p
              className="font-sans font-bold uppercase tracking-tight leading-snug"
              style={{ fontSize: "clamp(0.9rem,1.5vw,1.05rem)", color: "#111111" }}
            >
              {product.title}
            </p>
            {!open && (
              <p
                className="font-sans font-light text-sm leading-relaxed mt-1"
                style={{ color: "#888888" }}
              >
                {product.tagline}
              </p>
            )}
          </div>
        </button>

        {/* Right: badges + actions */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end pt-0.5">
          <span
            className="font-sans font-semibold tracking-[0.16em] uppercase hidden sm:inline"
            style={{ fontSize: "9px", color: "#1B3D8F" }}
          >
            {audienceLabel}
          </span>
          <span
            className="font-sans font-semibold tracking-[0.12em] uppercase px-2 py-0.5"
            style={{
              backgroundColor: isFree ? "#D4580A" : "#111111",
              color: "#FFFFFF",
              fontSize: "9px",
            }}
          >
            {isFree ? "Free" : `KES ${product.price_kes.toLocaleString()}`}
          </span>

          {!open && (
            <>
              <Link
                href={`/shop/${product.slug}`}
                className="font-sans font-semibold tracking-[0.14em] uppercase px-3 py-1.5 hidden md:inline-flex btn-press"
                style={{ color: "#AAAAAA", fontSize: "9px", border: "1px solid #DDDDDD" }}
              >
                Details
              </Link>
              <button
                onClick={onBuy}
                className="btn-press font-sans font-bold tracking-[0.16em] uppercase px-4 py-1.5 border cursor-pointer"
                style={{ borderColor: "#D4580A", color: "#D4580A", fontSize: "9px" }}
              >
                {isFree ? "Download" : "Get"} <Arr />
              </button>
            </>
          )}

          {/* Expand toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="cursor-pointer ml-1"
            style={{
              fontSize: "1.2rem",
              color: "#D4580A",
              lineHeight: 1,
              display: "block",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 220ms cubic-bezier(0.23,1,0.32,1)",
              background: "none",
              border: "none",
              padding: 0,
            }}
            aria-label={open ? "Collapse" : "Expand"}
          >
            +
          </button>
        </div>
      </div>

      {/* Expanded panel — CSS grid trick: 0fr → 1fr, actual content height */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 380ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div className="pl-7 pb-10" style={{ borderTop: "1px solid #F0EDE8" }}>

            {loading ? (
              <div className="py-10 flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full border-2 animate-spin"
                  style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }}
                />
                <span className="font-sans text-sm" style={{ color: "#AAAAAA" }}>Loading…</span>
              </div>
            ) : (
              <div className="pt-8 flex flex-col gap-10">

                {/* Description */}
                <p className="font-sans font-light text-base leading-relaxed" style={{ color: "#444444", maxWidth: "52rem" }}>
                  {(display as ExtendedProduct).description ?? product.tagline}
                </p>

                {/* What's inside */}
                {(display as ExtendedProduct).features?.length ? (
                  <div>
                    <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
                      What&apos;s inside
                    </p>
                    <ul className="flex flex-col gap-3">
                      {(display as ExtendedProduct).features!.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span style={{ color: "#D4580A", flexShrink: 0, marginTop: "0.15rem" }}>—</span>
                          <span className="font-sans font-light text-sm leading-relaxed" style={{ color: "#333333" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* You get */}
                {(display as ExtendedProduct).what_you_get?.length ? (
                  <div>
                    <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
                      You get
                    </p>
                    <ul className="flex flex-col gap-3">
                      {(display as ExtendedProduct).what_you_get!.map((w, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span style={{ color: "#D4580A", flexShrink: 0, marginTop: "0.15rem" }}>✓</span>
                          <span className="font-sans font-light text-sm leading-relaxed" style={{ color: "#333333" }}>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Recommendations */}
                {recs.length > 0 && (
                  <div>
                    <p className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "#D4580A" }}>
                      Pair it with
                    </p>
                    <div className="mt-4 border-t" style={{ borderColor: "#F0EDE8" }}>
                      {recs.map((rec) => (
                        <Link
                          key={rec.slug}
                          href={`/shop/${rec.slug}`}
                          className="flex items-start justify-between gap-6 py-5 border-b group"
                          style={{ borderColor: "#F0EDE8" }}
                        >
                          <div className="flex flex-col gap-1 min-w-0">
                            <span
                              className="font-sans font-semibold tracking-[0.16em] uppercase"
                              style={{ fontSize: "9px", color: rec.reason_type === "copurchase" ? "#1B3D8F" : "#AAAAAA" }}
                            >
                              {rec.reason}
                            </span>
                            <p
                              className="font-sans font-bold text-sm leading-snug"
                              style={{ color: "#111111", transition: "color 150ms ease" }}
                            >
                              {rec.title}
                            </p>
                            <p className="font-sans font-light text-xs leading-snug mt-0.5" style={{ color: "#888888" }}>
                              {rec.tagline}
                            </p>
                          </div>
                          <span
                            className="shrink-0 self-center font-sans font-semibold tracking-[0.1em] uppercase px-2 py-1"
                            style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "9px" }}
                          >
                            Free
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary CTA */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="btn-press font-sans font-semibold tracking-[0.16em] uppercase px-5 py-3"
                    style={{ color: "#AAAAAA", fontSize: "10px", border: "1px solid #DDDDDD" }}
                  >
                    View page
                  </Link>
                  <button
                    onClick={(e) => { e.stopPropagation(); onBuy(); }}
                    className="btn-press font-sans font-bold tracking-[0.2em] uppercase px-8 py-3 cursor-pointer"
                    style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "11px" }}
                  >
                    {isFree ? "Download" : "Get"} <Arr />
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
