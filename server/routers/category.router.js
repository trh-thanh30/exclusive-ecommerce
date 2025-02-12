const express = require("express");
const { createCategory } = require("../controllers/category.controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, createCategory);
module.exports = router;
