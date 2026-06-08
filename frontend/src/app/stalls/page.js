import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import StallCard from "@/components/cards/StallCard";

import { stalls } from "@/data/stalls";

export default function StallsPage() {
  return (
    <>
      <Navbar />

      <main className="container">

        <section
          style={{
            paddingTop: "48px",
            paddingBottom: "64px",
          }}
        >
          <h1
            style={{
              marginBottom: "32px",
            }}
          >
            Alle vejboder
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
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

      </main>

      <Footer />
    </>
  );
}