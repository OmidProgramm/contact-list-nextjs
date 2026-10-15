import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken')

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

        // Create Token withe JWT
        const token = jwt.sign({email:user.email, role: user.role},process.env.JWT_SECRET,{expiresIn:'1min'})
        res.status(200).json({message:'logged in successfully.',token})

    } catch (error) {
        return res.status(500).json({message: 'Server Error'})
    }
}