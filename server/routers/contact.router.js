const express = require("express");
const {
  createContact,
  getContact,
  getAllContacts,
  deleteContact,
  updateContact,
} = require("../controllers/contact.controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// POST
router.post("/create-contact", verifyToken, createContact);
// GET
router.get("/", verifyToken, getAllContacts);
router.get("/:id", verifyToken, getContact);
// DELETE
router.delete("/:id", verifyToken, deleteContact);
// PUT
router.put("/:id", verifyToken, updateContact);
module.exports = router;
