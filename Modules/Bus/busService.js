import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllBuses = async (req, res) => {
    try {
          const buses = await prisma.bus.findMany({ include: { route: true, schedules: true, layout: true } });
  res.json(buses);
    } catch (error) {
      console.error("Error fetching buses:", error);
      res.status(500).json({ error: "Internal server error" });
    }

};


export const getBus = async (req, res) => {
 try {
    const id = parseInt(req.params.id);
    const bus = await prisma.bus.findUnique({ 
    where: { id }, 
    include: { busSeats: true, route: true, schedules: true, layout: true } 
  });
  if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
 } catch (error) {
   console.error("Error fetching bus:", error);
   res.status(500).json({ error: "Internal server error" });
 }
};

export const createBus = async (req, res) => {
  try {
    const {  busNumber, busType, totalSeats, operatorName ,origin,destination } = req.body;
    const routeId=await prisma.busRoute.findFirst({
        where:{origin,destination}
    }).then(route=>route.id)
    const bus = await prisma.bus.create({
        data: { routeId, busNumber, busType, totalSeats, operatorName },
    });
  res.status(201).json(bus);
  } catch (error) {
    console.error("Error creating bus:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBus = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const routeId=await prisma.busRoute.findFirst({
            where:{origin:req.body.origin,destination:req.body.destination}
        }).then(route=>route.id)
        const { busNumber, busType, totalSeats, operatorName } = req.body;
        const bus = await prisma.bus.update({
            where: { id },
            data: { routeId, busNumber, busType, totalSeats, operatorName },
        });
        res.json(bus);
    } catch (error) {
        console.error("Error updating bus:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteBus = async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      await prisma.bus.delete({ where: { id } });
      res.json({ message: "Bus deleted" });
  } catch (error) {
      console.error("Error deleting bus:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};