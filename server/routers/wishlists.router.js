const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { wishLists, getAllWishLists, removeAllWishLists } = require("../controllers/wishlists.controllers");
const router = express.Router();

router.put("/", verifyToken, wishLists); // PUSH AND PULL
router.get("/", verifyToken, getAllWishLists);
router.delete("/", verifyToken, removeAllWishLists);
module.exports = router;
