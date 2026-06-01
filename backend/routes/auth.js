const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], state: true })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.json({ ok: true, user: req.user });
  }
);

router.get("/me", (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }

  res.status(401).json({ error: "Ikke logget ind" });
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

module.exports = router;