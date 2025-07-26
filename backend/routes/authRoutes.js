const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create new user (password will be hashed by pre-save hook)
    const newUser = new User({
      username: username || email.split('@')[0], // fallback if username not provided
      email,
      password
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Exclude password from user object
    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({ token, user: userObj });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login user and return JWT token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Exclude password from user object
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ token, user: userObj });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
