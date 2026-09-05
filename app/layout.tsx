import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Ian Dullu — I build sales systems for East African firms",
  description:
    "Founder of DDi by Dullu Group, Mombasa. Four years in business at 19. Documenting every system, every cost, every failure — weekly.",
  metadataBase: new URL("https://dullugroup.co.ke"),
  openGraph: {
    title: "Ian Dullu — I build sales systems for East African firms",
    description:
      "Founder of DDi by Dullu Group, Mombasa. Four years in business at 19. Documenting every system, every cost, every failure — weekly.",
    url: "https://dullugroup.co.ke",
    siteName: "Ian Dullu",
    images: [{ url: "/og-image.jpg", width: 1080, height: 1350 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Dullu — I build sales systems for East African firms",
    description:
      "Founder of DDi by Dullu Group, Mombasa. Four years in business at 19. Documenting every system, every cost, every failure — weekly.",
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