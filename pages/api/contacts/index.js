import Contact from "@/models/Contact"
import mongoose from "mongoose"


const handler = async (req,res) => {
    mongoose.connect('mongodb://localhost:27017/contact-list')
    .then(()=> console.log("onnect to DB successfully."))
    .catch((err)=>console.log(err))

    if(req.method == 'GET'){
        const contacts = await Contact.find()
        res.status(200).json(contacts)
    }

    
}

export default handler