import { ShopClient } from "@/components/shop/ShopClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Library — DR.DULLU",
  description:
    "Free templates, automation scripts, and resources that complement the tools. Cold email templates, CRM setups, outreach frameworks. No card, no catch.",
};

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description?: string;
  features?: string[];
  what_you_get?: string[];
  category: string;
  audience: string;
  price_kes: number;
  price_usd: number;
  cover_image: string | null;
  active: number;
  sort_order?: number;
}

async function getProducts(): Promise<Product[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !supabaseKey) return [];

  try {
    const params = new URLSearchParams({
      active: 'eq.true',
      select: 'id,slug,title,tagline,category,audience,price_kes,price_usd,cover_image,active',
      order: 'sort_order.asc',
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
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <ShopClient products={products} />
      </main>
      <Footer />
    </>
  );
}
