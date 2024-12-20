// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get the Authorization header and ensure it's present
  const authorizationHeader = req.header('Authorization');
  
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Extract the token from the header
  const token = authorizationHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    // Handle invalid token error
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = auth;
