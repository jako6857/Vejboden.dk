const express = require("express");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const csurf = require("csurf");
const passport = require("passport");

require("./config/passport");

const authRoutes = require("./routes/auth");
const vejboderRoutes = require("./routes/vejboder");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://accounts.google.com"],
        connectSrc: ["'self'", "https://accounts.google.com"],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(csurf());

app.get("/", (req, res) => {
  res.json({ ok: true, service: "vejboden-backend" });
});

app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/auth", authRoutes);
app.use("/vejboder", vejboderRoutes);

module.exports = app;