// modules/auth/authController.js
import express, { Router } from 'express';
import passport from 'passport';
import { register, login, googleCallback, protectedRoute } from '../auth/authService.js';

const authRoutes = Router();

// Local Register/Login
authRoutes.post('/register', register);
authRoutes.post('/login', login);

// Google OAuth Routes
authRoutes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
authRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);
// Protected Route
authRoutes.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }),
  protectedRoute
);

export default authRoutes;