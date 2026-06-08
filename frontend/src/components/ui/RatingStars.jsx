import { Star } from "lucide-react";

export default function RatingStars({
  rating,
  reviews,
}) {
  return (
    <div className="rating">
      <Star
        size={16}
        fill="#F2994A"
        color="#F2994A"
      />

      <span>{rating}</span>

      <small>
        ({reviews})
      </small>
    </div>
  );
}