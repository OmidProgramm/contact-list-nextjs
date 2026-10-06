import Contact from "@/models/Contact"
import connectDB from "@/utils/connectDB"
import { isValidObjectId } from "mongoose"

const handler = async (req,res)=>{
    connectDB()

    if(req.method == 'GET'){
        const {id} = req.query
        
        if(isValidObjectId(id)){
            const contact = await Contact.findById(id)
            if(contact){
                res.status(200).json(contact)
            }else{
                res.status(404).json({message: 'Contact did not found'})
            }
            
        }else{
            res.status(404).json({message: 'Contact ID is invalid'})
        }
        
    }
}
export default handler