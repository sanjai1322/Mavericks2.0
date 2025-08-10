const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /auth/register
router.post('/register', authController.register);

// POST /auth/login
router.post('/login', authController.login);

module.exports = router;