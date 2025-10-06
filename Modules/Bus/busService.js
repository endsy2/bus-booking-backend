import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getBusLayoutWithSeats = async (req, res) => {
  try {
    const { busId } = req.params;

    // 1. Fetch bus and layout
    const bus = await prisma.bus.findUnique({
      where: { id: parseInt(busId) },
      include: {
        layout: true, // BusLayout
        seats: true,  // All seats of this bus
      },
    });

    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json({
      layout: bus.layout?.layout || [], // JSON layout array
      seats: bus.seats.map(seat => ({
        id: seat.id,
        seatNumber: seat.seatNumber,
        price: seat.price,
        status: seat.status,
        positionLabel: seat.positionLabel,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bus layout" });
  }
};

export const getbusdestandtime = async (req, res) => {
try {
const { origin, destination,departureTime,returnTime } = req.body;
const buses=await prisma.bus.findMany({
  where: {
    route: {
      origin: origin,
      destination: destination,
    },
    schedules: {
      some: {
        departureTime: {
          gte: new Date(departureTime),
          lte: new Date(returnTime)
        }
      }
    }
  },
  include: { route: true, schedules: true, layout: true }
});
res.status(200).json(buses);
} catch (error) {
  res.status(500).json({ message: "Failed to fetch bus with time" });
}
}


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
    const { busNumber, busType, totalSeats, operatorName, origin, destination, layout } = req.body;

    // 1. Find or create the route
    let route = await prisma.busRoute.findFirst({ where: { origin, destination } });
    if (!route) {
      route = await prisma.busRoute.create({ data: { origin, destination } });
    }

    // 2. Create the bus
    const bus = await prisma.bus.create({
      data: {
        busNumber,
        busType,
        totalSeats,
        operatorName,
        routeId: route.id,
      },
    });

    // 3. Create bus layout (JSON with seat info)
    // layout example: [["1A","1B","1C"],["2A","2B","2C"],["3A",null,"3C"]]
    if (layout && Array.isArray(layout)) {
      await prisma.busLayout.create({
        data: {
          busId: bus.id,
          layout,
        },
      });

      // Optional: create seats in the Seat table automatically
      const seatData = [];
      layout.forEach((row, rowIndex) => {
        row.forEach((seatNumber, colIndex) => {
          if (seatNumber) {
            seatData.push({
              busId: bus.id,
              seatNumber,
              rowNumber: rowIndex + 1,
              colNumber: colIndex + 1,
              positionLabel: seatNumber,
              status: "AVAILABLE",
            });
          }
        });
      });

      if (seatData.length > 0) {
        await prisma.seat.createMany({ data: seatData });
      }
    }

    res.status(201).json({ bus, message: "Bus and layout created successfully" });
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