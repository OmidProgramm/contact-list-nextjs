import mongoose,{model, Schema} from "mongoose";
const contactSchema = new Schema({
    firstName: {type: String,trim:true,minLength:3, maxLength:15},
    lastName: {type: String,trim:true,minLength:3, maxLength:15},
    age: {type: String,trim:true},
    gender: {type: String,trim:true,minLength:4, maxLength:6},
    phone: {type: String,trim:true,maxLength:10,match:/0\d{9}/}
});

const Contact = mongoose.models.Contact || mongoose.model('Contact',contactSchema)
export default Contact