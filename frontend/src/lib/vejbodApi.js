const API_URL =
  "https://qgtruekfxirtjhkyvnrl.supabase.co/rest/v1/Vejbod";

const API_KEY =
  "sb_publishable_B680OwsWvcObqg_62R2tGw_E37G3MPp";

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [String(value)];
}

function inferCategories(products) {
  const normalizedProducts = products.map((product) =>
    normalizeText(product)
  );

  const categoryMatchers = {
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

  return Object.entries(categoryMatchers)
    .filter(([, keywords]) =>
      normalizedProducts.some((product) =>
        keywords.some((keyword) =>
          product.includes(normalizeText(keyword))
        )
      )
    )
    .map(([label]) => label);
}

function normalizeVejbodRow(row) {
  const products = toArray(row?.produkter ?? row?.products);

  return {
    id: row?.id,
    title: row?.navn ?? row?.title ?? "Ukendt bod",
    distance: row?.distance ?? "",
    rating: row?.rating ?? 0,
    reviews: row?.reviews ?? 0,
    products,
    categories: inferCategories(products),
    raw: row,
  };
}

async function fetchVejboder() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Kunne ikke hente vejboder: ${response.status}`);
  }

  const rows = await response.json();

  return rows.map(normalizeVejbodRow);
}

export { fetchVejboder, inferCategories, normalizeText, normalizeVejbodRow, toArray };