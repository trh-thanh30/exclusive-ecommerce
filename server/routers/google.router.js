const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google Authentication Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Google Callback Route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/signin",
    successRedirect: "http://localhost:3000/",
  })
);

module.exports = router;
