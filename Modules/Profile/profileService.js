import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();


export const getProfile=async(req,res)=>{
    try {
        const userId=req.user.id;
        const profile=await prisma.user.findUnique({
            where:{id:userId}
        })
        if(!profile){
            return res.status(404).json({error:"Profile not found"})
        }
        res.json({profile})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch profile"})
    }
}
export const updateProfile=async(req,res)=>{
    try {
        const userId=req.user.id;
        const image=req.file?req.file.path:null;
        const {fullname,phone,address}=req.body;
        res.json({userId,fullname,phone,address,image})
        const updatedProfile=await prisma.user.upsert({
            where:{id:userId},
            update:{fullname,phone,address,image},
            create:{fullname,phone,address,image}
        })
        res.json({message:"Profile Updated",profile:updatedProfile})
    } catch (error) {
        res.status(500).json({error:"Failed To Update Profile"})
    }
}