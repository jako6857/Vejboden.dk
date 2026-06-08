"use client";

import { useEffect, useMemo, useState } from "react";

import StallCard from "@/components/cards/StallCard";

import "@/components/ui/FilterPills.css";

import { filterDefinitions, filterStalls } from "@/lib/stallFilters";
import { fetchVejboder } from "@/lib/vejbodApi";

export default function StallExplorer({ stalls }) {
  const [activeFilter, setActiveFilter] =
    useState("Alle");
  const [apiStalls, setApiStalls] = useState(stalls ?? []);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadStalls() {
      try {
        const fetchedStalls = await fetchVejboder();

        if (mounted) {
          setApiStalls(fetchedStalls);
          setError("");
        }
      } catch (loadError) {
        if (mounted) {
          setApiStalls(stalls ?? []);
          setError(
            "API’et kunne ikke læses lige nu, så den bruger den lokale fallback-liste."
          );
        }
      }
    }

    loadStalls();

    return () => {
      mounted = false;
    };
  }, [stalls]);

  const visibleStalls = useMemo(
    () => filterStalls(apiStalls, activeFilter),
    [apiStalls, activeFilter]
  );

  return (
    <>
      <div className="filters">
        {filterDefinitions.map((filter) => (
          <button
            key={filter}
            className={
              activeFilter === filter
                ? "pill active"
                : "pill"
            }
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {error ? (
        <p style={{ marginBottom: "16px", color: "#636E72" }}>
          {error}
        </p>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          paddingBottom: "64px",
        }}
      >
        {visibleStalls.length > 0 ? (
          visibleStalls.map((stall) => (
            <StallCard
              key={stall.id}
              stall={stall}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              padding: "24px",
              borderRadius: "16px",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              color: "#636E72",
            }}
          >
            Ingen steder matcher lige nu kategorien "
            {activeFilter}".
          </div>
        )}
      </div>
    </>
  );
}