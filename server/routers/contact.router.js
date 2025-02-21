const express = require("express");
const {
  createContact,
  getContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contact.controllers");
const verifyToken = require("../middleware/verifyToken");
const Contact = require("../models/contact.models");
const router = express.Router();

// POST
router.post("/create-contact", verifyToken, createContact);
// GET
router.get("/", verifyToken, getAllContacts);
router.get("/:id", verifyToken, getContact);
// DELETE
router.delete("/:id", verifyToken, deleteContact);
module.exports = router;
