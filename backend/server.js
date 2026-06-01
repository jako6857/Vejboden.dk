const express = require("express");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const csurf = require("csurf");
const { body, param, validationResult } = require("express-validator");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://accounts.google.com'],
      connectSrc: ["'self'", 'https://accounts.google.com'],
      imgSrc: ["'self'", 'data:'],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Du skal være logget ind" });
};

// CSRF protection (stateful sessions)
app.use(csurf());

// expose CSRF token for clients (fetch before mutating requests)
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

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
  passport.authenticate("google", { scope: ["profile", "email"], state: true })
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
app.get("/vejboder", isAuthenticated, async (req, res) => {
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

const validateVejbod = [
  body('navn').isString().isLength({ min: 1 }).trim().escape(),
  body('lat').isFloat({ min: -90, max: 90 }).toFloat(),
  body('lng').isFloat({ min: -180, max: 180 }).toFloat(),
  body('produkter').optional().isArray(),
  body('ejer_id').optional().isInt().toInt(),
];

app.post("/vejboder", isAuthenticated, validateVejbod, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
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

const validateVejbodUpdate = [
  param('id').isInt().toInt(),
  body('navn').optional().isString().trim().escape(),
  body('lat').optional().isFloat({ min: -90, max: 90 }).toFloat(),
  body('lng').optional().isFloat({ min: -180, max: 180 }).toFloat(),
  body('produkter').optional().isArray(),
];

app.put("/vejboder/:id", isAuthenticated, validateVejbodUpdate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
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

app.delete("/vejboder/:id", isAuthenticated, async (req, res) => {
  try {
    await prisma.vejbod.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Vejbod slettet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/vejboder/:id", isAuthenticated, async (req, res) => {
  try {
    const vejbod = await prisma.vejbod.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!vejbod) return res.status(404).json({ error: "Vejbod ikke fundet" });
    res.json(vejbod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});