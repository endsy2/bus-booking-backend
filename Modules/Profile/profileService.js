import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();


export const getProfile=async(req,res)=>{
    try {
        const userId=req.user.id;
        const profile=await prisma.profile.findUnique({
            where:{userId}
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
        const {name,phone,address}=req.body;
        const updatedProfile=await prisma.profile.upsert({
            where:{userId},
            update:{name,phone,address,image},
            create:{userId,name,phone,address,image}
        })
        res.json({message:"Profile Updated",profile:updatedProfile})
    } catch (error) {
        res.status(500).json({error:"Failed To Update Profile"})
    }
}