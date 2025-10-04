import { Router } from "express";
import { getAllSchedules, getSchedule, createSchedule, updateSchedule, deleteSchedule } from "./busScheduleService.js";
const busScheduleRoute=Router()
busScheduleRoute.get('/', getAllSchedules);
busScheduleRoute.get('/:id', getSchedule);
busScheduleRoute.post('/', createSchedule);
busScheduleRoute.put('/:id', updateSchedule);
busScheduleRoute.delete('/:id', deleteSchedule);
export { busScheduleRoute };