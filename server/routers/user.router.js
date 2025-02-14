const express = require("express");
const {
  signup,
  signin,
  getInformation,
  deleteUser,
  deleteUserByAdmin,
} = require("../controllers/user.controllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

/** GET */
router.get("/get-information", verifyToken, getInformation);
/** POST */
router.post("/signup", signup);
router.post("/signin", signin);
/** PUT */
router.put("/update-user", verifyToken, updateUser);
/** DELETE */
router.delete("/delete-user", verifyToken, deleteUser);
router.delete("/deleteUserByAdmin", verifyToken, deleteUserByAdmin);

module.exports = router;
