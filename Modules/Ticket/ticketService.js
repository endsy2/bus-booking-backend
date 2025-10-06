import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const TicketByUserPending=async(req,res)=>{
try {
    const userId=req.user.id;
    const tickets=await prisma.ticket.findMany({
        where:{userId,status:"PENDING"},
        include:{busSchedule:true}
    })
    if(tickets.length===0){
        return res.status(404).json({message:"No pending tickets found"})
    }
    res.json(tickets);
} catch (error) {
    res.status(500).json({message:"Failed to fetch tickets"})
}
}

export const TicketByUserPast=async(req,res)=>{
    try {
        const userId=req.user.id;
        const tickets=await prisma.ticket.findMany({
            where:{userId,status:"COMPLETED"},
            include:{busSchedule:true}
        })
        if(tickets.length===0){
            return res.status(404).json({message:"No past tickets found"})
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch tickets"})
    }
}
export const getTicketDetails=async(req,res)=>{
    try {
        
        const ticketId=parseInt(req.params.id);
        const ticket=await prisma.ticket.findUnique({
            where:{id:ticketId},
            include:{busSchedule:true,bookingSeats:{include:{busSeat:true}}}
        })
        if(!ticket){
            return res.status(404).json({message:"Ticket not found"})
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch ticket details"})
    }
}