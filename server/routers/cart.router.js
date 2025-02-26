const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  addToCart,
  applyCoupon,
  getCart,
  emptyCart,
} = require("../controllers/cart.controllers");
const router = express.Router();
// POST
router.post("/apply-coupon", verifyToken, applyCoupon);
router.post("/", verifyToken, addToCart);
// GET
router.get("/", verifyToken, getCart);
// DELETE
router.delete("/", verifyToken, emptyCart);
module.exports = router;
