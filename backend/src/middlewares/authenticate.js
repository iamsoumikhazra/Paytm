import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token', error: err });
    }

    req.user = decoded; // Attach decoded token data to the request object
    next();
  });
};

export default authenticate;
