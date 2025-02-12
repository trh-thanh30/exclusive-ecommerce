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

router.get("/google/user", async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
