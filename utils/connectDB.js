import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    if(mongoose.connections[0].readyState) return
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connect to DB successfully.")
  } catch (error) {
    console.log(error)
  }
}

export default connectDB