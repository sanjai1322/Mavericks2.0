const express = require('express');
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /profile/update - Update profile with AI skill extraction
router.post('/update', authenticateToken, profileController.updateProfile);

// GET /profile - Get user profile
router.get('/', authenticateToken, profileController.getProfile);

module.exports = router;