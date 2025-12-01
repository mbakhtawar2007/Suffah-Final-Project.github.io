// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../middleware/validators');

// Register route
router.post('/register', registerValidator, authController.register);

// Login route — accepts email OR username
router.post('/login', loginValidator, authController.login);

module.exports = router;
