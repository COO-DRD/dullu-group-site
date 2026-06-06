import type { MetadataRoute } from "next";

const API = "https://dullu-shop-api.dullugroup.co.ke";

async function getProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API}/api/products`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const products = await res.json() as Array<{ slug: string }>;
    return products.map((p) => p.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://dullugroup.co.ke";
  const slugs = await getProductSlugs();

  const productPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/shop/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: base,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/shop`,     lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    ...productPages,
    { url: `${base}/login`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
