import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
