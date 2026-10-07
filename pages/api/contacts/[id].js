import Contact from "@/models/Contact"
import connectDB from "@/utils/connectDB"
import { isValidObjectId } from "mongoose"

const handler = async (req,res)=>{
    connectDB()

    const {id} = req.query
    if(isValidObjectId(id)){
        if(req.method == 'GET'){
            const contact = await Contact.findById(id)
            if(contact){
                res.status(200).json(contact)
            }else{
                res.status(404).json({message: 'Contact did not found'})
            }
        }else if(req.method == 'DELETE'){
            const result = await Contact.findByIdAndDelete(id)
            if(result){
                res.status(200).json({message: 'Contact deleted successfully.'})
            }else{
                res.status(404).json({message: 'Contact did not found'})
            }
        }else if(req.method == 'PUT'){
            const result = await Contact.findByIdAndUpdate(id)
            console.log(result)
            res.status(200).json({message: 'Contact updated successfully.'})
        }
    }else{
        res.status(404).json({message: 'Contact ID is invalid'})
    }
}
export default handler