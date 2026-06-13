import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyForm from "@/components/community/ApplyForm";

export const metadata: Metadata = {
  title: "Apply to Join — The Young African Founder",
  description:
    "Apply to join the private TYAF community. Founders building lean, from cities nobody expected, without institutional backing. We review every application personally.",
  alternates: { canonical: "https://dullugroup.co.ke/community/apply" },
  robots: { index: false }, // Keep it invite-only feeling — not indexed
};

export default function CommunityApplyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
