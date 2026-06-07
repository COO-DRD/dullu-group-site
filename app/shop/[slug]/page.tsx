import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductPageClient from "@/components/shop/ProductPageClient";
import type { Product } from "@/app/shop/page";

async function getProduct(slug: string): Promise<Product | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const params = new URLSearchParams({
      slug: `eq.${slug}`,
      active: 'eq.true',
      select: '*',
      limit: '1',
    });
    const res = await fetch(
      `${supabaseUrl}/rest/v1/shop_products?${params}`,
      {
        cache: 'no-store',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );
    if (!res.ok) return null;
    const rows = await res.json() as Product[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Not Found — DR.DULLU" };

  const priceLabel = product.price_kes === 0
    ? "Free Download"
    : `KES ${product.price_kes.toLocaleString()}`;

  const title = `${product.title} — DR.DULLU`;
  const description = `${priceLabel} · ${product.description || product.tagline}`;
  const ogImage = `/api/og/shop/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `https://dullugroup.co.ke/shop/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://dullugroup.co.ke/shop/${slug}`,
      siteName: "DR.DULLU",
      images: [{ url: ogImage, width: 1200, height: 630, alt: product.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product || !product.active) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <ProductPageClient product={product} />
      </main>
      <Footer />
    </>
  );
}
