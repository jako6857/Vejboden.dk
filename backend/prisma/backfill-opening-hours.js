require("dotenv").config();

const { PrismaClient } = require(".prisma/client/client");

const prisma = new PrismaClient();

const openingHoursByName = [
  ["Lars' Gårdbutik", "Man-fre 08:00-18:00, lør-søn 09:00-16:00"],
  ["Nørremarks Vejbod", "Alle dage 07:00-20:00"],
  ["Lars' Vinterbod", "Ons-søn 10:00-15:00"],
  ["Skovkanten Grønt", "Fre-søn 09:00-17:00"],
  ["Majas Blomster & Grønt", "Man-lør 08:30-17:30"],
  ["Strandvejen Bod", "Tirs-søn 09:00-18:00"],
  ["Haveboden", "Alle dage 08:00-19:00"],
  ["Maja's Sommerbod", "Fre-søn 10:00-16:00"],
  ["Sørens Æbleplantage", "Man-fre 09:00-17:00"],
  ["Markens Gave", "Alle dage 07:30-18:30"],
  ["Søren's Krydderurtebod", "Tirs-lør 08:00-14:00"],
  ["Vestmarkens Bod", "Fre-søn 11:00-16:00"],
  ["Hannes Honningbod", "Man-lør 09:00-17:00"],
  ["Rosenhaven", "Tirs-søn 10:00-16:00"],
  ["Hanne's Grøntsagsbod", "Alle dage 08:00-18:00"],
  ["Lille Havebod", "Fre-søn 09:00-15:00"],
  ["Thomas' Kartoffelbod", "Man-fre 08:00-16:00"],
  ["Møllegårdens Bod", "Alle dage 06:00-14:00"],
  ["Thomas' Frugthave", "Tirs-søn 09:00-17:00"],
  ["Engens Bod", "Fre-søn 10:00-18:00"],
];

async function main() {
  let updatedCount = 0;

  for (const [navn, åbningstider] of openingHoursByName) {
    const result = await prisma.$executeRaw`
      UPDATE "Vejbod"
      SET "åbningstider" = ${åbningstider}
      WHERE "navn" = ${navn}
        AND ("åbningstider" = '' OR "åbningstider" IS NULL)
    `;

    updatedCount += result;
  }

  console.log(`Backfilled åbningstider on ${updatedCount} vejboder.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });