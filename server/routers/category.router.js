const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
} = require("../controllers/category.controllers");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// POST
router.post("/", verifyToken, createCategory);

// PUT
router.put("/update-category/:id", verifyToken, updateCategory);
// DELETE
router.delete("/delete-category/:id", verifyToken, deleteCategory);
// GET
router.get("/:id", getCategory);
router.get("/", getAllCategory);
module.exports = router;
