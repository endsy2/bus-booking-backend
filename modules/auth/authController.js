// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Local Register/Login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

// Protected Route with JWT
router.get('/dashboard',
  passport.authenticate('jwt', { session: false }),
  authController.protected
);

module.exports = router;
