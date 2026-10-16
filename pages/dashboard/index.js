import User from '@/models/User'
import connectDB from '@/utils/connectDB'
import { verify } from 'jsonwebtoken'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'
import styles from '@/styles/Dashboard.module.css'

const Dashboard = ({user}) => {
  return (
    <div className={styles.container}>
      <h3>Hi {user.firstName} {user.lastName} </h3>
      <h4>Dashboard</h4>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps(context){
  // Get Token from Cookies
  const {token} = context.req.cookies
  // Check Token exist
  if(!token){ return { redirect : { destination : "/auth/login"}}}
  // Verify Token
  let tokenPayload = null
  try {
    tokenPayload = verify(token,process.env.JWT_SECRET)
  } catch (error) {
    return { redirect : { destination : "/auth/login"}}
  }
  await connectDB()
  const user = await User.findOne({email:tokenPayload.email}).select('firstName lastName -_id')

  return {
    props : {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}
