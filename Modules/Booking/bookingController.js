import { Router } from "express";
import { bookSeats, cancelBooking } from "./bookingService";

const bookingRoute = Router();

bookingRoute.post('/bookSeat',bookSeats)
bookingRoute.post('/cancelBooking',cancelBooking)
export { bookingRoute };