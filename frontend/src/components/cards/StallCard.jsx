import Link from "next/link";
import { MapPin } from "lucide-react";

import RatingStars from "../ui/RatingStars";
import RateButton from "../ui/RateButton";

import "./StallCard.css";

export default function StallCard({
  stall,
}) {
  return (
    <article className="stall-card">

      <div className="stall-image"></div>

      <div className="stall-content">

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

          <RatingStars
            rating={stall.rating}
            reviews={stall.reviews}
          />

        </div>

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

        <Link
            href={`/stall/${stall.id}`}
            className="details-btn"
          >
            Se detaljer
        </Link>

        <RateButton />

      </div>

    </article>
  );
}