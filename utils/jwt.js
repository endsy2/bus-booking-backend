// utils/jwt.js
import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// export const verifyToken = (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET);
// };


