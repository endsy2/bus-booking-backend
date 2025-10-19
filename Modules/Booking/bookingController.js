import { Router } from "express";
import { bookSeats, cancelBooking } from "./bookingService.js";

const bookingRoute = Router();

bookingRoute.post('/bookSeat',bookSeats)
bookingRoute.post('/cancelBooking/:bookingId',cancelBooking)
export { bookingRoute };