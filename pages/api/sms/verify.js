import connectDB from "@/utils/connectDB";
import Otp from '@/models/Otp';

export default async function handler(req,res){
    const {phone, code} = req.body
   
    const isValidCode = await Otp.findOne({phone,code})
    if(!isValidCode){
        return res.status(401).json({message: 'The Code is invalid'})
    }
    const isExpiredCode = new Date().getTime() > isValidCode.expTime
    if(isExpiredCode){
        return res.status(410).json({message: 'The Code is expired'})
    }
    return res.status(202).json({message: 'Wellcone to the Page'})
    
}   