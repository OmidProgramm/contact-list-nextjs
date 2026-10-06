import mongoose,{model, Schema} from "mongoose";
const contactSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    age: {type: String},
    gender: {type: String},
    phone: {type: String}
});

const Contact = mongoose.models.Contact || mongoose.model('Contact',contactSchema)
export default Contact