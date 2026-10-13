import { models,model,Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const User = models.User || model('User', userSchema)
export default User