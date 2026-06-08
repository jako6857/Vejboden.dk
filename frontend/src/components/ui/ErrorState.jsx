"use client";

import { TriangleAlert } from "lucide-react";

export default function ErrorState() {
  return (
    <div className="error-state">

      <TriangleAlert size={56} />

      <h2>
        Noget gik galt
      </h2>

      <p>
        Vi kunne ikke hente
        vejboderne lige nu.
      </p>

      <button
        onClick={() =>
          window.location.reload()
        }
      >
        Prøv igen
      </button>

    </div>
  );
}