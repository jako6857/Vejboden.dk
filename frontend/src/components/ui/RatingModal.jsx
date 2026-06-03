"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function RatingModal({
  open,
  onClose,
}) {
  const [selected, setSelected] =
    useState(0);

  if (!open) return null;
  

  return (
    <div className="modal-overlay">

      <div
          className="rating-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rating-title"
        >

        <h2 id="rating-title">
          Bedøm denne vejbod
        </h2>

        <p>
          Vælg mellem 1 og 5
          stjerner
        </p>

        <div className="star-picker">

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <button
                key={star}
                onClick={() =>
                  setSelected(star)
                }
              >
                <Star
                  size={36}
                  fill={
                    star <= selected
                      ? "#F2994A"
                      : "none"
                  }
                  color="#F2994A"
                />
              </button>
            )
          )}

        </div>

        <div className="modal-actions">

          <button
            onClick={onClose}
            className="cancel-btn"
          >
            Annuller
          </button>

          <button
            className="submit-btn"
          >
            Gem bedømmelse
          </button>

        </div>

      </div>

    </div>
  );
}