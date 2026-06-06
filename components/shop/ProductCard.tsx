import type { Product } from "@/app/shop/page";

export default function ProductCard({
  product,
  onBuy,
}: {
  product: Product;
  onBuy: () => void;
}) {
  const isFree = product.price_kes === 0;
  const audienceLabel =
    product.audience === "sme"
      ? "SME"
      : product.audience === "corporate"
      ? "Corporate"
      : "All";

  return (
    <div className="bg-ink p-8 flex flex-col hover:bg-ink-light transition-colors">
      <div className="flex items-start justify-between gap-4 mb-6">
        <span className="text-xs font-semibold tracking-[0.15em] text-gold uppercase">
          {audienceLabel}
        </span>
        <span
          className={`text-xs font-semibold tracking-[0.1em] uppercase px-2 py-1 shrink-0 ${
            isFree ? "bg-gold text-ink" : "border border-gold/40 text-gold"
          }`}
        >
          {isFree ? "Free" : `KES ${product.price_kes.toLocaleString()}`}
        </span>
      </div>

      <h3 className="font-bold text-offwhite text-lg leading-snug mb-3">
        {product.title}
      </h3>
      <p className="font-light text-grey text-sm leading-relaxed mb-8 flex-1">
        {product.tagline}
      </p>

      <button
        onClick={onBuy}
        className={`w-full font-semibold text-sm tracking-[0.1em] uppercase py-3 transition-all cursor-pointer ${
          isFree
            ? "bg-gold text-ink hover:brightness-110"
            : "border border-gold text-gold hover:bg-gold hover:text-ink"
        }`}
      >
        {isFree ? "Get for Free →" : "Buy Now →"}
      </button>
    </div>
  );
}
