// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const createToken = (user) => {
    // Include the user's role in the JWT payload
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role }, // <-- ADDED ROLE HERE
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    );
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        // The 'role' will default to 'user' as per the schema definition
        const user = await User.create({ username, email, password }); // No need to hash here, pre-save hook handles it

        const token = createToken(user);
        // Return the role with the user object for frontend convenience
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } }); // <-- ADDED ROLE HERE
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'user-not-found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'wrong-password' });

        // --- ADD THESE CONSOLE.LOGS ---
        console.log('User object retrieved from DB:', user); // Check if 'role' is present here
        const token = createToken(user);
        const decodedTokenForDebug = jwt.decode(token); // Decode it here for logging
        console.log('JWT Payload (decoded) sent to frontend:', decodedTokenForDebug); // Check if 'role' is present here and is 'admin'
        // --- END ADDITIONS ---

        // Return the role with the user object for frontend convenience
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } }); // <-- ADDED ROLE HERE
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};