import mongoose from "mongoose"


const handler = async (req,res) => {
    mongoose.connect('mongodb://localhost:27017/contact-list')
    .then(()=> console.log("onnect to DB successfully."))
    .catch((err)=>console.log(err))
}

export default handler