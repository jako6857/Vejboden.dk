const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const helmet = require("helmet");

const app = express();
const prisma = new PrismaClient();

const isProd = process.env.NODE_ENV === "production";

// Basic security hardening
app.use(helmet());
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json({ limit: "100kb" }));

app.get("/", (req, res) => {
  res.send("Backend virker!");
});

// GET alle vejboder
app.get("/vejboder", async (req, res) => {
  try {
    const { produkt } = req.query;
    const vejboder = await prisma.vejbod.findMany({
      where: produkt
        ? { produkter: { has: produkt } }
        : undefined,
    });
    res.json(vejboder);
  } catch (err) {
    res.status(500).json({ error: isProd ? "Internal server error" : err.message });
  }
});

// POST opret vejbod
app.post("/vejboder", async (req, res) => {
  try {
    const { navn, lat, lng, produkter, ejer_id } = req.body;
    const vejbod = await prisma.vejbod.create({
      data: { navn, lat, lng, produkter, ejer_id },
    });
    res.status(201).json(vejbod);
  } catch (err) {
    res.status(500).json({ error: isProd ? "Internal server error" : err.message });
  }
});

// PUT opdater vejbod
app.put("/vejboder/:id", async (req, res) => {
  try {
    const { navn, lat, lng, produkter } = req.body;
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const vejbod = await prisma.vejbod.update({
      where: { id },
      data: { navn, lat, lng, produkter },
    });
    res.json(vejbod);
  } catch (err) {
    res.status(500).json({ error: isProd ? "Internal server error" : err.message });
  }
});

// DELETE slet vejbod
app.delete("/vejboder/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    await prisma.vejbod.delete({
      where: { id },
    });
    res.json({ message: "Vejbod slettet" });
  } catch (err) {
    res.status(500).json({ error: isProd ? "Internal server error" : err.message });
  }
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server kører på port ${process.env.PORT}`);
});

// Graceful shutdown to ensure Prisma disconnects cleanly
async function shutdown(signal) {
  try {
    console.log(`Received ${signal}, shutting down...`);
    await prisma.$disconnect();
    server.close(() => process.exit(0));
  } catch (e) {
    console.error("Error during shutdown", e);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));