"use client";

import { useState } from "react";
import RatingModal from "./RatingModal";

export default function RateButton() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        className="rate-btn"
        onClick={() =>
          setOpen(true)
        }
      >
        Bedøm bod
      </button>

      <RatingModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
}