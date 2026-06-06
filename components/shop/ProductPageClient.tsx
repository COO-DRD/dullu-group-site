"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/app/shop/page";
import type { RecProduct } from "@/app/api/shop/recs/[slug]/route";
import CheckoutModal from "./CheckoutModal";
import { useEffect } from "react";

const audienceLabel = (a: string) =>
  a === "sme" ? "SME" : a === "corporate" ? "Corporate" : "All";

function ShareButton({ slug, title }: { slug: string; title: string }) {
  const url = `https://dullugroup.co.ke/shop/${slug}`;

  function share() {
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard.");
      });
    }
  }

  return (
    <button
      onClick={share}
      className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase flex items-center gap-2 transition-colors cursor-pointer"
      style={{ color: "#AAAAAA" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="10" cy="2" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="10" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="2" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="3.3" y1="5.25" x2="8.7" y2="2.75" stroke="currentColor" strokeWidth="1.2" />
        <line x1="3.3" y1="6.75" x2="8.7" y2="9.25" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      Share
    </button>
  );
}

export default function ProductPageClient({ product }: { product: Product }) {
  const isFree = product.price_kes === 0;
  const [modalOpen, setModalOpen] = useState(false);
  const [recs, setRecs] = useState<RecProduct[]>([]);

  useEffect(() => {
    fetch(`/api/shop/recs/${product.slug}`)
      .then((r) => r.json())
      .then(({ recs: r }: { recs: RecProduct[] }) => setRecs(r ?? []))
      .catch(() => {});
  }, [product.slug]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-12">
        <Link
          href="/shop"
          className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors"
          style={{ color: "#AAAAAA" }}
        >
          The Shop
        </Link>
        <span style={{ color: "#CCCCCC", fontSize: 10 }}>›</span>
        <span
          className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: "#888888" }}
        >
          {product.title.length > 40 ? product.title.slice(0, 40) + "…" : product.title}
        </span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <span
            className="font-sans font-semibold tracking-[0.18em] uppercase"
            style={{ fontSize: 10, color: "#1B3D8F" }}
          >
            {audienceLabel(product.audience)}
          </span>
          <span
            className="font-sans font-semibold tracking-[0.12em] uppercase px-3 py-1"
            style={isFree
              ? { backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: 10 }
              : { border: "1px solid #D4580A", color: "#D4580A", fontSize: 10 }}
          >
            {isFree ? "Free" : `KES ${product.price_kes.toLocaleString()}`}
          </span>
          <ShareButton slug={product.slug} title={product.title} />
        </div>

        <h1
          className="font-sans font-black uppercase tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", color: "#111111" }}
        >
          {product.title}
        </h1>

        <p
          className="font-sans font-light text-xl leading-relaxed"
          style={{ color: "#555555", maxWidth: "42rem" }}
        >
          {product.tagline}
        </p>
      </div>

      {/* Primary CTA — above fold */}
      <div className="mb-16 pb-16 border-b" style={{ borderColor: "#F0EDE8" }}>
        <button
          onClick={() => setModalOpen(true)}
          className="font-sans font-bold tracking-[0.2em] uppercase px-10 py-5 transition-all hover:brightness-110 cursor-pointer"
          style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: 11 }}
        >
          {isFree ? "Download for Free →" : `Get It for KES ${product.price_kes.toLocaleString()} →`}
        </button>
        {!isFree && (
          <p className="font-sans text-[10px] mt-3" style={{ color: "#BBBBBB" }}>
            M-Pesa STK push · Digital delivery in seconds
          </p>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="mb-14">
          <p
            className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: "#1B3D8F" }}
          >
            What This Is
          </p>
          <p
            className="font-sans font-light text-lg leading-relaxed"
            style={{ color: "#333333", maxWidth: "52rem" }}
          >
            {product.description}
          </p>
        </div>
      )}

      {/* Features — What's inside */}
      {product.features && product.features.length > 0 && (
        <div className="mb-14">
          <p
            className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase mb-8"
            style={{ color: "#1B3D8F" }}
          >
            What&apos;s Inside
          </p>
          <ul className="flex flex-col gap-5">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-start gap-5">
                <span
                  className="font-cinematic font-light shrink-0 leading-none select-none"
                  style={{ fontSize: "1.4rem", color: "#F0EDE8", marginTop: 2 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-sans font-light text-base leading-relaxed"
                  style={{ color: "#333333" }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What you get */}
      {product.what_you_get && product.what_you_get.length > 0 && (
        <div className="mb-14 p-8" style={{ backgroundColor: "#FAFAF8", border: "1px solid #F0EDE8" }}>
          <p
            className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase mb-6"
            style={{ color: "#D4580A" }}
          >
            You Get
          </p>
          <ul className="flex flex-col gap-4">
            {product.what_you_get.map((w, i) => (
              <li key={i} className="flex items-start gap-4">
                <span style={{ color: "#D4580A", flexShrink: 0, marginTop: 1 }}>✓</span>
                <span
                  className="font-sans font-medium text-sm leading-relaxed"
                  style={{ color: "#222222" }}
                >
                  {w}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Secondary CTA */}
      <div className="mb-16 pt-4">
        <button
          onClick={() => setModalOpen(true)}
          className="font-sans font-bold tracking-[0.2em] uppercase px-10 py-5 transition-all hover:brightness-110 cursor-pointer"
          style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: 11 }}
        >
          {isFree ? "Download for Free →" : `Pay KES ${product.price_kes.toLocaleString()} via M-Pesa →`}
        </button>
      </div>

      {/* Recommendations */}
      {recs.length > 0 && (
        <div className="pt-10 border-t" style={{ borderColor: "#F0EDE8" }}>
          <p
            className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase mb-1"
            style={{ color: "#D4580A" }}
          >
            Pair It With
          </p>
          <div className="mt-5">
            {recs.map((rec) => (
              <Link
                key={rec.slug}
                href={`/shop/${rec.slug}`}
                className="flex items-start justify-between gap-6 py-6 border-b transition-colors"
                style={{ borderColor: "#F0EDE8" }}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span
                    className="font-sans font-semibold tracking-[0.16em] uppercase"
                    style={{
                      fontSize: 9,
                      color: rec.reason_type === "copurchase" ? "#1B3D8F" : "#AAAAAA",
                    }}
                  >
                    {rec.reason}
                  </span>
                  <p
                    className="font-sans font-bold text-base leading-snug"
                    style={{ color: "#111111" }}
                  >
                    {rec.title}
                  </p>
                  <p
                    className="font-sans font-light text-sm leading-snug mt-0.5"
                    style={{ color: "#888888" }}
                  >
                    {rec.tagline}
                  </p>
                </div>
                <span
                  className="shrink-0 self-center font-sans font-semibold tracking-[0.1em] uppercase px-2 py-1"
                  style={rec.price_kes === 0
                    ? { backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: 9 }
                    : { border: "1px solid #D4580A", color: "#D4580A", fontSize: 9 }}
                >
                  {rec.price_kes === 0 ? "Free" : `KES ${rec.price_kes.toLocaleString()}`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to shop */}
      <div className="mt-14 pt-8 border-t" style={{ borderColor: "#F0EDE8" }}>
        <Link
          href="/shop"
          className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors"
          style={{ color: "#AAAAAA" }}
        >
          ← Back to The Shop
        </Link>
      </div>

      {modalOpen && (
        <CheckoutModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
