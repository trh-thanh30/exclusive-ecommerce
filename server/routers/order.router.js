const express = require("express");
const {
  createOrder,
  getOrderByUser,
  deleteOrder,
  cancelOrder,
  getOrderDetails,
  getAllOrdersAdmin,
  updateStatusOrder,
} = require("../controllers/order.controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// POST
router.post("/", verifyToken, createOrder);
// GET
router.get("/getAllOrdersAdmin", verifyToken, getAllOrdersAdmin);
router.get("/", verifyToken, getOrderByUser);
router.get("/:orderId", verifyToken, getOrderDetails);
// PATCH
router.patch("/cancel", verifyToken, cancelOrder);
router.patch("/update", verifyToken, updateStatusOrder);
module.exports = router;
