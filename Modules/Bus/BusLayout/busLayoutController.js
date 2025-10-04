import { Router } from "express";
import { getAllLayouts, getLayout, createLayout, updateLayout, deleteLayout } from "./busLayoutService.js";
const busLayoutRoute = Router();
busLayoutRoute.get('/', getAllLayouts);
busLayoutRoute.get('/:id', getLayout);
busLayoutRoute.post('/', createLayout);
busLayoutRoute.put('/:id', updateLayout);
busLayoutRoute.delete('/:id', deleteLayout);
export { busLayoutRoute };