import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeMain from "@/components/HomeMain";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HomeMain />
      </main>
      <Footer />
    </>
  );
}
