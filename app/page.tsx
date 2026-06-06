import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhatIBuild from "@/components/WhatIBuild";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Ticker />
        <Hero />
        <Problem />
        <WhatIBuild />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
