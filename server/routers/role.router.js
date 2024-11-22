const express = require('express');
const createRole = require('../controllers/role.controllers');
const router = express.Router();

/**POST */
// Create a new role
router.post('/', createRole)

module.exports = router