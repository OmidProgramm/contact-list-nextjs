import Contact from "@/models/Contact"
import mongoose from "mongoose"



const handler = async (req,res) => {

  mongoose.connect('mongodb://localhost:27017/contact-list')
    .then(()=> {
        if(mongoose.connections[0].readyState){
            return
            console.log("connect to DB successfully")
        }
    })
    .catch((err)=>console.log(err))
   if(req.method == 'GET'){
    const {id} = req.query
    const contact = await Contact.findById(id)
    res.status(200).json(contact)
   } 
}

export default handler