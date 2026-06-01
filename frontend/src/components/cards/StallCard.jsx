import {
  MapPin,
  Star,
} from "lucide-react";

import "./StallCard.css";

export default function StallCard({
  stall,
}) {
  return (
    <article className="stall-card">

      {/* IMAGE */}
      <div className="stall-image">
        🌾
      </div>

      {/* CONTENT */}
      <div className="stall-content">

        {/* HEADER */}
        <div className="stall-header">

          <div>
            <h3>{stall.title}</h3>

            <div className="distance">
              <MapPin size={14} />

              <span>
                {stall.distance}
              </span>
            </div>
          </div>

          <div className="rating">
            <Star
              size={16}
              fill="#F2994A"
            />

            <span>
              {stall.rating}
            </span>

            <small>
              ({stall.reviews})
            </small>
          </div>
        </div>

        {/* TAGS */}
        <div className="tags">

          {stall.products.map(
            (product) => (
              <span
                key={product}
                className="tag"
              >
                {product}
              </span>
            )
          )}

        </div>

        {/* BUTTON */}
        <button className="details-btn">
          Se detaljer
        </button>

      </div>
    </article>
  );
}