const express = require("express");
const {
  signup,
  signin,
  getInformation,
  deleteUser,
  deleteUserByAdmin,
  updateUser,
  logout,
} = require("../controllers/user.controllers");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../middleware/uploadImage");
const router = express.Router();

/** GET */
router.get("/get-information", verifyToken, getInformation);
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
/** DELETE */
router.delete("/delete-user", verifyToken, deleteUser);
router.delete("/deleteUserByAdmin", verifyToken, deleteUserByAdmin);

module.exports = router;
