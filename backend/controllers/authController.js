// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token safely
const createToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set. Please configure it in your environment.');
  }
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    secret,
    { expiresIn: '3d' }
  );
};

// REGISTER USER
exports.register = async (req, res) => {
  const { username: usernameFromBody, name, email, password } = req.body;
  const username = usernameFromBody || name;

  try {
    console.log('📝 Register attempt:', email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ username, email, password });
    console.log('✅ User registered:', email);

    const token = createToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('🔴 Register error:', err.message || err);
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    console.log('🔐 Login attempt:', email || username);

    if (!email && !username) {
      return res.status(400).json({ message: 'email-or-username-required' });
    }

    // Query user by email OR username
    const query = [];
    if (email) query.push({ email });
    if (username) query.push({ username });

    const user = await User.findOne({ $or: query });
    if (!user) {
      console.log('❌ User not found:', email || username);
      return res.status(404).json({ message: 'user-not-found' });
    }

    const match = await user.matchPassword(password);
    if (!match) {
      console.log('❌ Wrong password for:', email || username);
      return res.status(401).json({ message: 'wrong-password' });
    }

    const token = createToken(user);
    console.log('✅ Login successful for:', email || username);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('🔴 Login error:', err.message || err);
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
};
