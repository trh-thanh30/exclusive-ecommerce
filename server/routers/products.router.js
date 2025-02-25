const express = require("express");
const {
  createProducts,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  rating,
} = require("../controllers/products.controllers");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../middleware/uploadImage");
const router = express.Router();
router.post(
  "/create-product",
  verifyToken,
  cloudinaryFileUploader.array("images", 10),
  createProducts
);
router.put("/rating", verifyToken, rating);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
