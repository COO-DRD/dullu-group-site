import { NextRequest, NextResponse } from "next/server";

const SUPA_URL  = process.env.SUPABASE_URL!;
const SUPA_KEY  = process.env.SUPABASE_SERVICE_KEY!;
const SHOP_API  = "https://dullu-shop-api.dr-dullu.workers.dev";
const REC_COUNT = 3;

interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  audience: string;
  price_kes: number;
  active: number;
}

export interface RecProduct {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price_kes: number;
  reason: string;
  reason_type: "copurchase" | "content";
}

async function getCopurchaseSlugs(slug: string): Promise<Map<string, number>> {
  try {
    const res = await fetch(`${SUPA_URL}/rest/v1/rpc/get_recommendations`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
      },
      body: JSON.stringify({ input_slug: slug, result_limit: REC_COUNT + 2 }),
    });
    if (!res.ok) return new Map();
    const rows = await res.json() as { slug: string; score: number }[];
    return new Map(rows.map((r) => [r.slug, r.score]));
  } catch {
    return new Map();
  }
}

async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${SHOP_API}/api/products`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return [];
    const all = await res.json() as Product[];
    return all.filter((p) => p.active !== 0);
  } catch {
    return [];
  }
}

function audienceReason(p: Product): string {
  if (p.audience === "sme")       return "Popular with SME owners";
  if (p.audience === "corporate") return "Popular with corporate teams";
  return "Frequently paired with this";
}

function contentScore(target: Product, candidate: Product): number {
  let score = 0;
  if (candidate.audience === target.audience)                                    score += 3;
  else if (candidate.audience === "both" || target.audience === "both")          score += 2;
  if (candidate.price_kes === 0)                                                 score += 1;
  else if (Math.abs(candidate.price_kes - target.price_kes) / (target.price_kes || 1) < 1.5) score += 1;
  // deterministic tie-break using slug chars to avoid always returning the same order
  score += (candidate.slug.charCodeAt(0) % 3) * 0.01;
  return score;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [copurchaseMap, allProducts] = await Promise.all([
    getCopurchaseSlugs(slug),
    getAllProducts(),
  ]);

  const others = allProducts.filter((p) => p.slug !== slug);
  const results: RecProduct[] = [];

  // 1. Co-purchase recs (sorted by score desc)
  const copurchased = [...copurchaseMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => others.find((p) => p.slug === s))
    .filter(Boolean) as Product[];

  for (const p of copurchased) {
    if (results.length >= REC_COUNT) break;
    results.push({
      id: p.id, slug: p.slug, title: p.title, tagline: p.tagline,
      price_kes: p.price_kes,
      reason: "Bought together", reason_type: "copurchase",
    });
  }

  // 2. Content-based fallback to fill remaining slots
  if (results.length < REC_COUNT) {
    const usedSlugs = new Set(results.map((r) => r.slug));
    const target = allProducts.find((p) => p.slug === slug);

    if (target) {
      const scored = others
        .filter((p) => !usedSlugs.has(p.slug))
        .map((p) => ({ p, score: contentScore(target, p) }))
        .sort((a, b) => b.score - a.score);

      for (const { p } of scored) {
        if (results.length >= REC_COUNT) break;
        results.push({
          id: p.id, slug: p.slug, title: p.title, tagline: p.tagline,
          price_kes: p.price_kes,
          reason: audienceReason(p), reason_type: "content",
        });
      }
    }
  }

  return NextResponse.json(
    { recs: results },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" } }
  );
}
