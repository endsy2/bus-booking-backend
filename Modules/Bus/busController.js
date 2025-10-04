import { Router } from "express";
import { getAllBuses, getBus, createBus, updateBus, deleteBus } from "./busService.js";

const busRoute = Router();
busRoute.get('/', getAllBuses);
busRoute.get('/:id', getBus);
busRoute.post('/', createBus);
busRoute.put('/:id', updateBus);
busRoute.delete('/:id', deleteBus);

export { busRoute };