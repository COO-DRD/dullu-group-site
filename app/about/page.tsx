import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — DR.DULLU",
  description:
    "Ian Dullu Jillo — built an agency, a lead intelligence tool, a consumer brand, and a coaching system business before finishing school. The full story.",
  alternates: { canonical: "https://dullugroup.co.ke/about" },
};

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
