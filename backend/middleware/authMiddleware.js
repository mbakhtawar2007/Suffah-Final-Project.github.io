const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token should be in format: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
