import mongoose,{model, Schema} from "mongoose";
const contactSchema = new Schema({
    firstName: {type: String,trim:true,minLength:[3,'Name must be more than 3 char'], maxLength:[15,'Name must be less than 15 char']},
    lastName: {type: String,trim:true,minLength:[3,'Last Name must be more than 3 char'], maxLength:[15,'Last Name must be less than 15 char']},
    age: {type: Number,min:[18,'Age must be minimum 18 years old']},
    gender: {type: String,trim:true},
    phone: {type: String,trim:true,maxLength:[10,'Last Name must be more than 10 Number'],match:[/0\d{9}/,'Enter your Number']}
});

const Contact = mongoose.models.Contact || mongoose.model('Contact',contactSchema)
export default Contact