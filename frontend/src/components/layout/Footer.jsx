import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div>
          <h3>Adresse</h3>

          <p>Vejboden.dk</p>
          <p>Markvej 12</p>
          <p>9000 Aalborg</p>
          <p>Danmark</p>
        </div>

        <div>
          <h3>Kontakt</h3>

          <p>info@vejboden.dk</p>
          <p>+45 12 34 56 78</p>
        </div>

        <div>
          <h3>Politik</h3>

          <p>Privatlivspolitik</p>
          <p>Cookiepolitik</p>
        </div>

        <div>
          <h3>Information</h3>

          <p>Om os</p>
          <p>Ofte stillede spørgsmål</p>
        </div>

      </div>
    </footer>
  );
}