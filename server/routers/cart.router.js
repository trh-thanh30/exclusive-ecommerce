const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  addToCart,
  applyCoupon,
  getCart,
  emptyCart,
  updatedQuantity,
  removeCart,
} = require("../controllers/cart.controllers");
const router = express.Router();
// POST
router.post("/apply-coupon", verifyToken, applyCoupon);
router.post("/", verifyToken, addToCart);
// GET
router.get("/", verifyToken, getCart);
// DELETE
router.delete("/", verifyToken, emptyCart);

// PATCH
router.patch("/update-quantity", verifyToken, updatedQuantity);
router.patch("/remove-cart", verifyToken, removeCart);
module.exports = router;
