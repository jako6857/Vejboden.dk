export default function Privacy() {
  return (
    <main className="container">
      <div
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
          maxWidth: "800px",
        }}
      >
        <h1>
          Privatlivspolitik
        </h1>

        <br />

        <p>
          Vejboden.dk indsamler
          kun de oplysninger som
          er nødvendige for at
          levere tjenesten.
        </p>

        <br />

        <h2>Data</h2>

        <p>
          Navn
        </p>

        <p>
          E-mail
        </p>

        <p>
          Loginoplysninger via
          OAuth
        </p>

        <br />

        <h2>Cookies</h2>

        <p>
          Sessionscookies
        </p>

        <p>
          Præferencecookies
        </p>

        <br />

        <h2>Tredjeparter</h2>

        <p>
          Google OAuth
        </p>

        <p>
          Microsoft OAuth
        </p>
      </div>
    </main>
  );
}