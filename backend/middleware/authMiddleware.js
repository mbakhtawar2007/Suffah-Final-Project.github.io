const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log('Auth Header:', authHeader); // Keep for debugging if needed

  const token = authHeader && authHeader.split(' ')[1];
  // console.log('Extracted Token:', token); // Keep for debugging if needed

  if (!token) {
    // console.log('DEBUG: No token provided. Sending 401.');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    // console.log('DEBUG: JWT_SECRET in middleware:', secret ? 'Set' : 'Not Set', secret.length);
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // This now includes { id, email, role }
    // console.log('DEBUG: Token verified. Decoded user:', req.user);
    next();
  } catch (err) {
    // console.error('DEBUG: Token verification failed:', err.message);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// New middleware to authorize based on roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user will be populated by authenticateToken
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Access denied. User role not found.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles }; // Export both