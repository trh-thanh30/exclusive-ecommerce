const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { addToCart } = require("../controllers/cart.controllers");
const router = express.Router();
// POST
router.post("/", verifyToken, addToCart)
module.exports = router;
