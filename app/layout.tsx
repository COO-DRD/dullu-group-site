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
  title: "Ian Dullu — Student 156 of 156. Weekly letter.",
  description:
    "I searched “how to use a computer” on YouTube. Four years later I run a sales agency from Mombasa. The Young African Founder — free, weekly. Unsubscribe anytime.",
  metadataBase: new URL("https://www.dullugroup.co.ke/"),
  alternates: { canonical: "https://www.dullugroup.co.ke/" },
  openGraph: {
    title: "I was student 156 out of 156.",
    description:
      "I searched “how to use a computer” on YouTube. Four years later I run a sales agency from Mombasa. The Young African Founder — free, weekly. Unsubscribe anytime.",
    url: "https://www.dullugroup.co.ke/",
    siteName: "Ian Dullu",
    images: [{ url: "/og-1200x630.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I was student 156 out of 156.",
    description:
      "I searched “how to use a computer” on YouTube. Four years later I run a sales agency from Mombasa. The Young African Founder — free, weekly. Unsubscribe anytime.",
    images: ["/og-1200x630.jpg"],
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