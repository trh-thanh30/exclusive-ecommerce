const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  createBrand,
  getAllBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controllers");
const router = express.Router();
// POST
router.post("/create-brand", verifyToken, createBrand);

// GET
router.get("/", getAllBrand);
router.get("/:id", getBrand);

// PUT
router.put("/update-brand/:id", verifyToken, updateBrand);

// DELETE
router.delete("/:id", verifyToken, deleteBrand);
module.exports = router;
