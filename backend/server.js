const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user
    let user = await prisma.user.findFirst({
      where: { email: profile.emails[0].value }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          navn: profile.displayName,
          email: profile.emails[0].value,
          oauth_provider: "google",
        }
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

// Auth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // For testing without a frontend, return JSON instead of redirecting
    res.json({ ok: true, user: req.user });
  }
);

app.get("/auth/me", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Ikke logget ind" });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

// Vejboder routes
app.get("/vejboder", async (req, res) => {
  try {
    const { produkt } = req.query;
    const vejboder = await prisma.vejbod.findMany({
      where: produkt ? { produkter: { has: produkt } } : undefined,
    });
    res.json(vejboder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/vejboder", async (req, res) => {
  try {
    const { navn, lat, lng, produkter, ejer_id } = req.body;
    const vejbod = await prisma.vejbod.create({
      data: { navn, lat, lng, produkter, ejer_id },
    });
    res.status(201).json(vejbod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/vejboder/:id", async (req, res) => {
  try {
    const { navn, lat, lng, produkter } = req.body;
    const vejbod = await prisma.vejbod.update({
      where: { id: parseInt(req.params.id) },
      data: { navn, lat, lng, produkter },
    });
    res.json(vejbod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/vejboder/:id", async (req, res) => {
  try {
    await prisma.vejbod.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Vejbod slettet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});