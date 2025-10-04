import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./Modules/Auth/authController.js";
import { authMiddleware } from "./Middleware/auth.js";
import passport from "passport";
import './Config/passport.js';
import { profileRoute } from "./Modules/Profile/profileController.js";
import { paymentRoute } from "./Modules/Payment/paymentController.js";
import { bookingRoute } from "./Modules/Booking/bookingController.js";
import { busRoute } from "./Modules/Bus/busController.js";
import routeRoute from "./Modules/Route/RouteController.js";
import { busScheduleRoute } from "./Modules/Bus/BusSchedule/busScheduleController.js";
  


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
app.use('/bus', busRoute);
app.use('/route', routeRoute);
app.use('/booking', bookingRoute);
app.use('/bus/schedule', busScheduleRoute);

app.use
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});