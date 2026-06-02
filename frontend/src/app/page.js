import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

import FilterPills from "@/components/ui/FilterPills";

import StallCard from "@/components/cards/StallCard";

import { stalls } from "@/data/stalls";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section className="container">
        <FilterPills />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            paddingBottom: "64px",
          }}
        >
          {stalls.map((stall) => (
            <StallCard
              key={stall.id}
              stall={stall}
            />
          ))}
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </main>
  );
}