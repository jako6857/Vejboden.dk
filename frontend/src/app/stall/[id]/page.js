import Link from "next/link";

export default function StallDetail() {
  return (
    <main className="stall-detail">

      <div className="container">

        <Link
          href="/"
          className="back-link"
        >
          ← Tilbage
        </Link>

        <div className="detail-image"></div>

        <h1>
          Petersens Gård
        </h1>

        <p className="detail-location">
          Viborg, Danmark
        </p>

        <div className="detail-rating">
           4.5 (24 anmeldelser)
        </div>

        <section>
          <h2>
            Beskrivelse
          </h2>

          <p>
            Friske lokale råvarer
            direkte fra gården.
            Vi sælger æbler,
            pærer, jordbær og
            sæsonens grøntsager.
          </p>
        </section>

        <section>
          <h2>
            Produkter
          </h2>

          <div className="tags">

            <span className="tag">
              Æbler
            </span>

            <span className="tag">
              Pærer
            </span>

            <span className="tag">
              Jordbær
            </span>

          </div>

        </section>

        <section>
          <h2>
            Åbningstider
          </h2>

          <p>
            Mandag - Søndag
          </p>

          <p>
            08:00 - 20:00
          </p>

        </section>

      </div>

    </main>
  );
}