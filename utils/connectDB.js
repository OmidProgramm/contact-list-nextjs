import mongoose from 'mongoose'
import React from 'react'

const connectDB = async () => {
  try {
    if(mongoose.connections[0].readyState) return
    await mongoose.connect('mongodb://localhost:27017/contact-list')
    console.log("Connect to DB successfully.")
  } catch (error) {
    console.log(error)
  }
}

export default connectDB