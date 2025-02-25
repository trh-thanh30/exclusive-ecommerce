const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { wishLists, getAllWishLists } = require("../controllers/wishlists.controllers");
const router = express.Router();

router.put("/", verifyToken, wishLists); // PUSH AND PULL
router.get("/", verifyToken, getAllWishLists);
module.exports = router;
