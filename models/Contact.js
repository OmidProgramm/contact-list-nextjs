import mongoose, { Schema } from 'mongoose'


const contactSchema = new Schema({
    firstName: {type: String, minLength: 3, maxLength: 30},
    lastName: {type: String, minLength: 3, maxLength: 30},
    age: {type: String},
    gender: {type: String},
    phone: {type: String},
})
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)
export default Contact