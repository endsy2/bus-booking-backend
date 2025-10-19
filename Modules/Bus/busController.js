import { Router } from "express";
import { getAllBuses, getBus, createBus, updateBus, deleteBus } from "./busService.js";

const busRoute = Router();
busRoute.get('/', getAllBuses);
busRoute.get('/:id', getBus);
busRoute.post('/createbus', createBus); //testing
busRoute.put('/:id', updateBus);//testing
busRoute.delete('/:id', deleteBus);//testing

export { busRoute };