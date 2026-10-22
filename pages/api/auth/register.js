import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import bcrypt from 'bcrypt'

export default async function handler(req,res){
    
    // Check Post Method
    if(req.method != 'POST'){
        return res.status(405).json({message: 'Method is not allowed'})
    }

    try {
        // Validation
        const {firstName, lastName, email, password} = req.body
        if(!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()){
            return res.status(409).json({message: 'Fill all fields'})
        }

        if(password.length < 8 || password.length > 20 ){
            return res.status(409).json({message: 'Password length must be between 8 and 20 char'})
        }
        // Check pattern Email
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(!regexEmail.test(email) ){
            return res.status(409).json({message: 'Email invalid'})
        }
        // Connect to DB
        await connectDB()
        
        // Check Unique Email
        const isUserExist = await User.findOne({email})
        if(isUserExist){
            return res.status(409).json({message: 'User is exist'})
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password,10)
        // determin User Role
        const countUsers = await User.countDocuments()
        // Create User
        await User.create({...req.body,password:hashPassword,role: countUsers > 0 ? 'user': 'admin'})
        return res.status(201).json({message: 'User is registered successfully.'})

    } catch (error) {
        return res.status(500).json({message: 'Server Error.'})
    }
   
}