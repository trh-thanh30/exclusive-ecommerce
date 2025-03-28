const express = require("express");
const { createBlogCategory, getAllBlogCategory, updateBlogCategory, deleteBlogCategory } = require("../controllers/blog-category.controllers");
const router = express.Router();
// POST
router.post("/", createBlogCategory);

// GET
router.get("/", getAllBlogCategory);

// PUT
router.put("/:id", updateBlogCategory);

// DELETE
router.delete("/:id", deleteBlogCategory);
module.exports = router;
