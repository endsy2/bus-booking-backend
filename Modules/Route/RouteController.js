import { Router } from "express";
import { getAllRoutes, getAllBuses, getRoute, createRoute, updateRoute, deleteRoute } from "./RouteService.js";

const routeRoute = Router();

routeRoute.get('/', getAllRoutes);
routeRoute.get('/:id', getRoute);
routeRoute.post('/', createRoute);
routeRoute.put('/:id', updateRoute);
routeRoute.delete('/:id', deleteRoute);

export default routeRoute;