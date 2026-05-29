const { PrismaClient } = require(".prisma/client/client");
const prisma = new PrismaClient();

async function main() {
  // Clean up eksisterende data inden den bygger ny 
  await prisma.vejbod.deleteMany();
  await prisma.user.deleteMany();

  // Laver Users
  const lars = await prisma.user.create({
    data: { navn: "Lars Nielsen", email: "lars@example.com" },
  });
  const maja = await prisma.user.create({
    data: { navn: "Maja Andersen", email: "maja@example.com" },
  });
  const søren = await prisma.user.create({
    data: { navn: "Søren Christensen", email: "soren@example.com" },
  });
  const hanne = await prisma.user.create({
    data: { navn: "Hanne Pedersen", email: "hanne@example.com" },
  });
  const thomas = await prisma.user.create({
    data: { navn: "Thomas Møller", email: "thomas@example.com" },
  });

  // Create vejboder
  await prisma.vejbod.createMany({
    data: [
      // Lars's vejboder
      {
        navn: "Lars' Gårdbutik",
        lat: 55.676,
        lng: 12.568,
        produkter: ["æbler", "pærer", "syltetøj"],
        ejer_id: lars.id,
        rating: 4.5,
      },
      {
        navn: "Nørremarks Vejbod",
        lat: 55.681,
        lng: 12.572,
        produkter: ["kartofler", "gulerødder", "løg"],
        ejer_id: lars.id,
        rating: 4.2,
      },
      {
        navn: "Lars' Vinterbod",
        lat: 55.673,
        lng: 12.561,
        produkter: ["æbler", "kål", "rodfrugter", "valnødder"],
        ejer_id: lars.id,
        rating: 3.8,
      },
      {
        navn: "Skovkanten Grønt",
        lat: 55.669,
        lng: 12.577,
        produkter: ["svampe", "bær", "urter"],
        ejer_id: lars.id,
        rating: 4.7,
      },

      // Maja's vejboder
      {
        navn: "Majas Blomster & Grønt",
        lat: 55.689,
        lng: 12.551,
        produkter: ["blomster", "honning", "krydderurter"],
        ejer_id: maja.id,
        rating: 4.8,
      },
      {
        navn: "Strandvejen Bod",
        lat: 55.694,
        lng: 12.545,
        produkter: ["jordbær", "rabarber", "marmelade"],
        ejer_id: maja.id,
        rating: 4.0,
      },
      {
        navn: "Haveboden",
        lat: 55.701,
        lng: 12.538,
        produkter: ["tomater", "agurker", "courgetter"],
        ejer_id: maja.id,
        rating: 3.9,
      },
      {
        navn: "Maja's Sommerbod",
        lat: 55.697,
        lng: 12.542,
        produkter: ["hindbær", "solbær", "stikkelsbær", "syltetøj"],
        ejer_id: maja.id,
        rating: 4.3,
      },

      // Søren's vejboder
      {
        navn: "Sørens Æbleplantage",
        lat: 55.665,
        lng: 12.589,
        produkter: ["æbler", "æblejuice", "cider"],
        ejer_id: søren.id,
        rating: 4.6,
      },
      {
        navn: "Markens Gave",
        lat: 55.659,
        lng: 12.601,
        produkter: ["majs", "græskar", "kartofler", "rødbeder"],
        ejer_id: søren.id,
        rating: 4.1,
      },
      {
        navn: "Søren's Krydderurtebod",
        lat: 55.663,
        lng: 12.595,
        produkter: ["basilikum", "rosmarin", "timian", "persille"],
        ejer_id: søren.id,
        rating: 4.4,
      },
      {
        navn: "Vestmarkens Bod",
        lat: 55.655,
        lng: 12.610,
        produkter: ["selleri", "pastinak", "persillerod"],
        ejer_id: søren.id,
        rating: 3.7,
      },

      // Hanne's vejboder
      {
        navn: "Hannes Honningbod",
        lat: 55.710,
        lng: 12.530,
        produkter: ["honning", "bivoks", "pollen"],
        ejer_id: hanne.id,
        rating: 5.0,
      },
      {
        navn: "Rosenhaven",
        lat: 55.715,
        lng: 12.522,
        produkter: ["roser", "lavendel", "tørrede blomster"],
        ejer_id: hanne.id,
        rating: 4.9,
      },
      {
        navn: "Hanne's Grøntsagsbod",
        lat: 55.707,
        lng: 12.535,
        produkter: ["salat", "spinat", "radiser", "rucola"],
        ejer_id: hanne.id,
        rating: 4.3,
      },
      {
        navn: "Lille Havebod",
        lat: 55.712,
        lng: 12.528,
        produkter: ["æg", "ost", "smør"],
        ejer_id: hanne.id,
        rating: 4.6,
      },

      // Thomas's vejboder
      {
        navn: "Thomas' Kartoffelbod",
        lat: 55.648,
        lng: 12.620,
        produkter: ["kartofler", "søde kartofler", "jordskokker"],
        ejer_id: thomas.id,
        rating: 4.2,
      },
      {
        navn: "Møllegårdens Bod",
        lat: 55.643,
        lng: 12.630,
        produkter: ["rugbrød", "surdej", "korn"],
        ejer_id: thomas.id,
        rating: 4.7,
      },
      {
        navn: "Thomas' Frugthave",
        lat: 55.651,
        lng: 12.615,
        produkter: ["blommer", "kirsebær", "pærer", "æbler"],
        ejer_id: thomas.id,
        rating: 4.5,
      },
      {
        navn: "Engens Bod",
        lat: 55.638,
        lng: 12.641,
        produkter: ["græskarsuppe", "tørrede bælgfrugter", "nødder"],
        ejer_id: thomas.id,
        rating: 3.6,
      },
    ],
  });

  console.log("✅ Seed complete: 5 users, 20 vejboder");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
