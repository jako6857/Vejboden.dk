import Button from "../ui/Button";

import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">

        <div className="hero-content">

          <h1>
            Find friske råvarer
            lokalt
          </h1>

          <p>
            Opdag lokale vejboder
            med frugt, grøntsager
            og hjemmelavede produkter
            tæt på dig.
          </p>

          <div className="hero-search">

            <input
              type="text"
              placeholder="Søg efter område..."
            />

            <Button>
              Søg
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
}