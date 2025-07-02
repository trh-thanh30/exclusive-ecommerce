const express = require("express");
const {
  createAddress,
  getAllAddress,
  editAddress,
  getDetailAddress,
  deleteAddress,
  getAddressIsDefault,
} = require("../controllers/address.controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.post("/", verifyToken, createAddress);
router.get("/", verifyToken, getAllAddress);
router.get("/address-default", verifyToken, getAddressIsDefault);
router.get("/:id", verifyToken, getDetailAddress);
router.patch("/:id", verifyToken, editAddress);
router.delete("/:id", verifyToken, deleteAddress);
module.exports = router;
