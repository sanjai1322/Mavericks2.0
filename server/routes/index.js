const express = require('express');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');

const router = express.Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

module.exports = router;