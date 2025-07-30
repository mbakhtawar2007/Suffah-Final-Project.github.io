// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
// Import the controller functions
const authController = require('../controllers/authController');

// Register new user
router.post('/register', authController.register);

// Login user and return JWT token
router.post('/login', authController.login);

module.exports = router;