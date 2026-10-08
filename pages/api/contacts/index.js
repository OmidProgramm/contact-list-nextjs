
import Contact from "@/models/Contact"
import connectDB from "@/utils/connectDB"

const handler = async (req,res)=>{
    connectDB()
    if(req.method == 'GET'){
        let contacts = null
        const {gen,search} = req.query

        if(gen && search){
            contacts = await Contact.find({$and:[{gender:gen},{$or:[{firstName:search},{lastName:search}]}]})
        }else if(gen){
            if(gen == 'male'){
                contacts = await Contact.find({gender: 'male'})
            }else if(gen == 'female'){
                contacts = await Contact.find({gender: 'female'})
            }else{
                contacts = await Contact.find()
            }
        }else if(search){
            contacts = await Contact.find({$or: [{firstName: search},{lastName:search}]})
            if(contacts==false){
                contacts = await Contact.find()
            }
        }else{
            contacts = await Contact.find()
        }
        res.status(200).json(contacts)
    }else if(req.method == 'POST'){
        try {
            const contact = await Contact.create(req.body)
            res.status(201).json({message: 'Contact added successfully.'})
        } catch (error) {
            if(error.name == 'ValidationError'){
                let errorMessage = ''
                Object.values(error.errors).map(err=>errorMessage += err.message + `\n`)
                return res.status(422).json({message: errorMessage})
            }
            res.status(500).json({message:'Server not found'})
        }
    }else{
        res.status(405).json({message:'Method does not allowed'})
    }
}
export default handler