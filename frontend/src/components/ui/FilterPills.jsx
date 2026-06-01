"use client";

import { useState } from "react";

import "./FilterPills.css";

const filters = [
  "Alle",
  "Frugt",
  "Grøntsager",
  "Økologisk",
  "Gårdbutik",
];

export default function FilterPills() {
  const [active, setActive] =
    useState("Alle");

  return (
    <div className="filters">

      {filters.map((filter) => (
        <button
          key={filter}
          className={
            active === filter
              ? "pill active"
              : "pill"
          }
          onClick={() =>
            setActive(filter)
          }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}