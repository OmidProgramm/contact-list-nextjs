import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import bcrypt from 'bcrypt'

export default async function handler(req,res){
    await connectDB()
    // Check Post Method
    if(req.method != 'POST'){
        return res.status(405).json({message: 'Method is not allowed'})
    }

    // Validation
    const {firstName, lastName, email, password} = req.body
    if(!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()){
        return res.status(422).json({message: 'Fill all fields'})
    }
    if(password.length < 8 || password.length > 20 ){
        return res.status(422).json({message: 'Password length must be between 8 and 20 char'})
    }

    // Check Unique Email
    const isUserExist = await User.findOne({email})
    if(isUserExist){
        return res.status(409).json({message: 'User is exist'})
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password,10)
    // Create User
    await User.create({...req.body,password:hashPassword})
    return res.status(201).json({message: 'User is registered successfully.'})
}