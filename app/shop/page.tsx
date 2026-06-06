import { ShopClient } from "@/components/shop/ShopClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Shop — DR.DULLU",
  description:
    "Playbooks and automation systems for East African business owners. Start free. Build serious.",
};

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  audience: string;
  price_kes: number;
  price_usd: number;
  cover_image: string | null;
  active: number;
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://dullu-shop-api.dullugroup.co.ke/api/products",
      { next: { revalidate: 120 } }
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
