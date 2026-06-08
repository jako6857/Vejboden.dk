import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

import StallExplorer from "@/components/sections/StallExplorer";

import { stalls } from "@/data/stalls";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section className="container">
        <StallExplorer stalls={stalls} />
      </section>

      <Footer />

      <CookieBanner />
    </main>
  );
}
