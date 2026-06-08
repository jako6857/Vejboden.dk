export default function CreateStallPage() {
  return (
    <main className="create-stall">

      <div className="container">

        <h1>
          Opret vejbod
        </h1>

        <p>
          Registrér din vejbod og
          begynd at sælge lokale
          råvarer.
        </p>

        <form className="stall-form">

          <label>
            Navn på vejbod
          </label>

          <input
            type="text"
            placeholder="Petersens Gård"
          />

          <label>
            Adresse
          </label>

          <input
            type="text"
            placeholder="Viborgvej 123"
          />

          <label>
            Produkter
          </label>

          <input
            type="text"
            placeholder="Æbler, Pærer..."
          />

          <label>
            Beskrivelse
          </label>

          <textarea
            rows="5"
            placeholder="Fortæl om din bod..."
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Opret vejbod
          </button>

        </form>

      </div>

    </main>
  );
}