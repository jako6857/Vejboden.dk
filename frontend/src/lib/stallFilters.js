const filterDefinitions = [
  "Alle",
  "Frugt",
  "Grøntsager",
  "Økologisk",
  "Gårdbutik",
];

const filterMatchers = {
  Frugt: [
    "frugt",
    "æble",
    "pære",
    "jordbær",
    "hindbær",
    "blåbær",
    "kirsebær",
    "bær",
    "melon",
    "drue",
    "appelsin",
    "citron",
  ],
  Grøntsager: [
    "grøntsag",
    "kartoffel",
    "gulerod",
    "tomat",
    "salat",
    "kål",
    "løg",
    "agurk",
    "peber",
    "broccoli",
    "spinat",
    "radise",
  ],
  Økologisk: [
    "økologisk",
    "okologisk",
    "øko",
    "organic",
  ],
  Gårdbutik: [
    "gårdbutik",
    "gårdsalg",
    "landhandel",
    "bod",
    "farm shop",
    "gård",
  ],
};

function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSearchableText(stall) {
  const parts = [
    stall?.title,
    ...(stall?.products ?? []),
    ...(stall?.categories ?? []),
  ];

  return normalizeText(parts.join(" "));
}

function matchesFilter(stall, filterLabel) {
  if (filterLabel === "Alle") {
    return true;
  }

  const keywords = filterMatchers[filterLabel];

  if (!keywords) {
    return false;
  }

  const searchableText = getSearchableText(stall);

  return keywords.some((keyword) =>
    searchableText.includes(normalizeText(keyword))
  );
}

function filterStalls(stalls, filterLabel) {
  return stalls.filter((stall) =>
    matchesFilter(stall, filterLabel)
  );
}

export {
  filterDefinitions,
  filterMatchers,
  filterStalls,
  matchesFilter,
  normalizeText,
};