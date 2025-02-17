const express = require("express");
const {
  signup,
  signin,
  deleteUser,
  deleteUserByAdmin,
  updateUser,
  logout,
  getUser,
  getUserByID,
  blockedUser,
  unblockedUser,
} = require("../controllers/user.controllers");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../middleware/uploadImage");
const router = express.Router();

/** GET */
router.get("/get-user", verifyToken, getUser);
router.get("/get-user/:id", verifyToken, getUserByID);
/** POST */
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
/** PUT */
router.put(
  "/update-user",
  verifyToken,
  cloudinaryFileUploader.single("avatar"),
  updateUser
);
router.put("/blocked-user/:id", verifyToken, blockedUser);
router.put("/unblocked-user/:id", verifyToken, unblockedUser);
/** DELETE */
router.delete("/delete-user", verifyToken, deleteUser);
router.delete("/deleteUserByAdmin", verifyToken, deleteUserByAdmin);

module.exports = router;
