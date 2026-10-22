import  {models,model,Schema} from 'mongoose'
const otpSchema = new Schema({
    phone: {type: String, required:true},
    code: {type:String,required:true},
    expTime:{type:Number,required:true}
})
const Otp = models.Otp || model('Otp',otpSchema)
export default Otp