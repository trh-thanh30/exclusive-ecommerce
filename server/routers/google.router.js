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
    failureRedirect: "/auth/failure",
    successRedirect: "/", // URL bạn muốn chuyển hướng sau khi đăng nhập thành công
  })
);

module.exports = router;
