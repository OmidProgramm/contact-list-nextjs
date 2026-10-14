import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import bcrypt from 'bcrypt'

export default async function handler(req,res){
    // Check Method
    if(req.method != 'POST'){
        return res.status(405).json({message: 'Method is not allowed'})
    }

    try {
        // Validation 
        const {email, password} = req.body
        if(!email.trim() || !password.trim()){
            return res.status(422).json({message: 'Fill in all fields'})
        }
        
        // Check pattern Email
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(!regexEmail.test(email) ){
            return res.status(422).json({message: 'Email invalid'})
        }
        // Connect DB
        await connectDB()

        // Find User
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message: 'Email or Pssword is wrong'})
        }

        // compare Password
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(401).json({message: 'Email or Pssword is wrong'})
        }
    } catch (error) {
        return res.status(500).json({message: 'Server Error'})
    }
}