import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/authController.js";
import { authMiddleware } from "./middleware/auth.js";
import passport from "passport";
import './config/passport.js';
import { profileRoute } from "./modules/profile/profileController.js";
import { paymentRoute } from "./modules/payment/paymentController.js";
import { busAndRouteRoute } from "./modules/busAndRoute/busAndRouteController.js";
import { bookingRoute } from "./modules/booking/bookingController.js";
  


config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; 


app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static("uploads"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);


app.use(authMiddleware);
// all route
app.use('/auth', authRoutes);
app.use('/profile', profileRoute);
app.use('/payment', paymentRoute);
app.use('/busAndRoute', busAndRouteRoute);
app.use('/booking', bookingRoute);

app.use
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});