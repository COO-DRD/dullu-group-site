import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ColdEmailChecker from "@/components/tools/ColdEmailChecker";

export const metadata: Metadata = {
  title: "Cold Email Diagnostic — DR.DULLU",
  description:
    "Paste your cold email and get an instant score, category breakdown, and exact fixes. Free. No sign-up needed. Based on data from Boomerang, Yesware, and Outreach.",
  openGraph: {
    title: "Cold Email Diagnostic — Free Scorer",
    description:
      "Get a score, breakdown, and exact fixes for your cold email in seconds. Free tool by DR.DULLU.",
    type: "website",
  },
};

export default function ColdEmailPage() {
  return (
    <>
      <Navbar />
      <main>
        <ColdEmailChecker />
      </main>
      <Footer />
    </>
  );
}
