const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`⚠️ Registration failed: Email ${email} already in use`);
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create new user (password is hashed by the model)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });

    console.log(`✅ New user registered: ${email}`);
  } catch (err) {
    console.error('❌ Registration error:', err.stack || err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`❌ Login failed: No user found for email ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.warn(`❌ Login failed: Incorrect password for email ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });

    console.log(`✅ User logged in: ${email}`);
  } catch (err) {
    console.error('❌ Login error:', err.stack || err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};
