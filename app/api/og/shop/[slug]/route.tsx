import { ImageResponse } from "next/og";

export const runtime = "edge";

const API = "https://dullu-shop-api.dullugroup.co.ke";

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${API}/api/products/${slug}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<{
      title: string;
      tagline: string;
      price_kes: number;
      audience: string;
      category: string;
    }>;
  } catch {
    return null;
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProduct(slug);

  const title = product?.title ?? "DR.DULLU Shop";
  const tagline = product?.tagline ?? "Playbooks for East African business owners.";
  const isFree = !product || product.price_kes === 0;
  const price = isFree ? "Free Download" : `KES ${product.price_kes.toLocaleString()}`;
  const audience =
    product?.audience === "sme"
      ? "SME"
      : product?.audience === "corporate"
      ? "Corporate"
      : "All";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#111111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#1B3D8F",
            }}
          >
            {audience}
          </span>
          <div style={{ flex: 1, height: 1, backgroundColor: "#222222" }} />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isFree ? "#FFFFFF" : "#D4580A",
              backgroundColor: isFree ? "#D4580A" : "transparent",
              border: isFree ? "none" : "1px solid #D4580A",
              padding: isFree ? "5px 12px" : "5px 12px",
            }}
          >
            {price}
          </span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: title.length > 35 ? 56 : 72,
              fontWeight: 900,
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 300,
              color: "#888888",
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#D4580A",
            }}
          >
            DR.DULLU
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "#555555",
              letterSpacing: "0.08em",
            }}
          >
            dullugroup.co.ke/shop/{slug}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
