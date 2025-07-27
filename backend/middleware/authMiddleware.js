const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader); // <<< MAKE SURE THIS IS PRESENT
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // <<< MAKE SURE THIS IS PRESENT

  if (!token) {
    console.log('DEBUG: No token provided. Sending 401.'); // <<< MAKE SURE THIS IS PRESENT
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    console.log('DEBUG: JWT_SECRET in middleware:', secret ? 'Set' : 'Not Set', secret.length); // <<< MAKE SURE THIS IS PRESENT
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log('DEBUG: Token verified. Decoded user:', req.user); // <<< MAKE SURE THIS IS PRESENT
    next();
  } catch (err) {
    console.error('DEBUG: Token verification failed:', err.message); // <<< MAKE SURE THIS IS PRESENT
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;