const express = require("express");
const createRole = require("../controllers/role.controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

/**POST */
router.post("/", verifyToken, createRole);
// GET
// PUT
// DELETE
module.exports = router;
