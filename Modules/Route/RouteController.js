import { Router } from "express";
import { getAllRoutes, getAllBuses, getRoute, createRoute, updateRoute, deleteRoute } from "./RouteService.js";

const routeRoute = Router();

routeRoute.get('/', getAllRoutes);
routeRoute.get('/:id', getRoute);
routeRoute.post('/', createRoute);//testing
routeRoute.put('/:id', updateRoute);//testing
routeRoute.delete('/:id', deleteRoute);//testing

export default routeRoute;