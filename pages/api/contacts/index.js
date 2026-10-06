
import Contact from "@/models/Contact"
import connectDB from "@/utils/connectDB"

const handler = async (req,res)=>{
    connectDB()
    if(req.method == 'GET'){
        const contacts = await Contact.find()
        res.status(200).json(contacts)
    }
}
export default handler