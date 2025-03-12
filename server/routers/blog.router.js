const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../middleware/uploadImage");
const {
  createBlog,
  updateBlog,
  getAllBlogs,
  getBlog,
  deleteBlog,
  dislikeBlog,
  likeBlog,
} = require("../controllers/blog.controllers");
const router = express.Router();

// POST
router.post(
  "/create-blog",
  verifyToken,
  (req, res, next) => {
    cloudinaryFileUploader.array("images", 10)(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: "Upload failed", error: err });
      }
      next();
    });
  },
  createBlog
);
// PUT
router.put("/update-blog/:id", verifyToken, updateBlog);
router.put("/likes", verifyToken, likeBlog);
router.put("/dislikes", verifyToken, dislikeBlog);
// GET
router.get("/", getAllBlogs);
router.get("/:id", getBlog);
// DELETE
router.delete("/:id", verifyToken, deleteBlog);
module.exports = router;
