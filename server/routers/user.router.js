const express = require("express");
const { signup, signin } = require("../controllers/user.controllers");
const router = express.Router();

/** GET */
/** POST */
router.post('/signup', signup)
router.post('/signin', signin)
/** PUT */
/** DELETE */


module.exports = router