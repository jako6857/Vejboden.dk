const express = require("express");
const { body, param, validationResult } = require("express-validator");

const prisma = require("../config/prisma");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

const validateVejbod = [
  body("navn").isString().isLength({ min: 1 }).trim().escape(),
  body("lat").isFloat({ min: -90, max: 90 }).toFloat(),
  body("lng").isFloat({ min: -180, max: 180 }).toFloat(),
  body("produkter").optional().isArray(),
  body("ejer_id").optional().isInt().toInt(),
];

const validateVejbodUpdate = [
  param("id").isInt().toInt(),
  body("navn").optional().isString().trim().escape(),
  body("lat").optional().isFloat({ min: -90, max: 90 }).toFloat(),
  body("lng").optional().isFloat({ min: -180, max: 180 }).toFloat(),
  body("produkter").optional().isArray(),
];

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const { produkt } = req.query;
    const vejboder = await prisma.vejbod.findMany({
      where: produkt ? { produkter: { has: produkt } } : undefined,
    });
    res.json(vejboder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const vejbod = await prisma.vejbod.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!vejbod) {
      return res.status(404).json({ error: "Vejbod ikke fundet" });
    }

    res.json(vejbod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", isAuthenticated, validateVejbod, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { navn, lat, lng, produkter, ejer_id } = req.body;
    const vejbod = await prisma.vejbod.create({
      data: { navn, lat, lng, produkter, ejer_id },
    });
    res.status(201).json(vejbod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", isAuthenticated, validateVejbodUpdate, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { navn, lat, lng, produkter } = req.body;
    const vejbod = await prisma.vejbod.update({
      where: { id: parseInt(req.params.id) },
      data: { navn, lat, lng, produkter },
    });
    res.json(vejbod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    await prisma.vejbod.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Vejbod slettet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;