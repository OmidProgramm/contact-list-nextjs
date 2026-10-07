
import Contact from "@/models/Contact"
import connectDB from "@/utils/connectDB"

const handler = async (req,res)=>{
    connectDB()
    if(req.method == 'GET'){
        const contacts = await Contact.find()
        res.status(200).json(contacts)
    }else if(req.method == 'POST'){
        try {
            const contact = await Contact.create(req.body)
            res.status(201).json({message: 'Contact added successfully.'})
        } catch (error) {
            res.status(422).json({message: error.message})
        }
        
    }
}
export default handler