const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/coupon.controllers");
const router = express.Router();
// POST
router.post("/", verifyToken, createCoupon);

// GET
router.get("/", verifyToken, getAllCoupons);

// DELETE
router.delete("/:id", verifyToken, deleteCoupon);

// PU
router.put("/:id", verifyToken, updateCoupon);
module.exports = router;
