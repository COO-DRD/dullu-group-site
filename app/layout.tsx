import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "DR.DULLU — Weapons for African Founders",
  description:
    "One person building a multinational-style operation from Kenya under $100/month. Playbooks, automation systems, and tools for East African business owners who want to stop doing everything manually.",
  metadataBase: new URL("https://dullugroup.co.ke"),
  openGraph: {
    title: "DR.DULLU — Weapons for African Founders",
    description:
      "You don't need a big budget to build big systems. You need the right weapons.",
    url: "https://dullugroup.co.ke",
    siteName: "DR.DULLU",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DR.DULLU — Weapons for African Founders",
    description:
      "You don't need a big budget to build big systems. You need the right weapons.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://dullu-shop-api.dullugroup.co.ke" />
        <link rel="dns-prefetch" href="https://dullu-shop-api.dullugroup.co.ke" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
