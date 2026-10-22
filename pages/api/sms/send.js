
import connectDB from "@/utils/connectDB";
import Otp from '@/models/Otp';

export default async function handler (req,res){
   
    if(req.method == 'POST'){
        const {phone} = req.body
        const code = Math.floor(Math.random() * 9000 + 1000)
        const expTime = new Date().getTime() + (30 * 1000)
        
        try {
            const response = await fetch('http://localhost:3000/api/sms/send',{
                method: 'Put',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify({phone,code})
            })
            const data = await response.json()
            
            if(response.status == 200){
                await connectDB();
                res.status(200).json({message: data.message})
                await Otp.create({phone,code,expTime})

            }else{
                res.status(response.status).json({message: response.statusText})
            }
        } catch (error) {
            res.status(500).json({message:error.message})
        }
        
    }
    if(req.method == 'PUT'){
        const {phone,code} = req.body
        if(code.toString().length == 4){
            res.status(200).json({message: 'Code is resived successfully.'})
        }else{
            res.status(402).json({message: 'Code is wrong'})
        }
    }
      
} 
  

 