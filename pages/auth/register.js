import React, { useState } from 'react'
import styles from '@/styles/AddContact.module.css'
import Link from 'next/link'
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useRouter } from 'next/router';
import validateToken from '@/utils/auth';

const Register = () => {
    const router = useRouter()
    const [showPass, setShowPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

  const showPassHandler = ()=>setShowPass(!showPass)

  const registerHandler = async (e)=>{
    e.preventDefault()
    setIsLoading(true)
        const res = await fetch('http://localhost:3000/api/auth/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    const data = await res.json()
    setIsLoading(false)
     if(res.status == 405 || res.status == 409 || res.status == 500){
        return toast.error(data.message,{duration:5000})
    }
    toast.success(data.message,{duration:5000})
    router.replace('/auth/login') 
  }

  return (
       <div className={styles.container}>
        <form>
          <input type="text" name='firstName' placeholder='First Name' 
          value={formData.firstName}
          onChange={(e)=>setFormData({...formData,firstName:e.target.value})}
          />
          <input type="text" name='lastName' placeholder='Last Name'
             value={formData.lastName}
            onChange={(e)=>setFormData({...formData,lastName:e.target.value})}
            />
          <input type="text" name='email' placeholder='your Email'
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          />
         <div className={styles.password}>
            <input type={showPass?"text":'password' }  name='password' placeholder='your Password'
            value={formData.password}
          onChange={(e)=>setFormData({...formData,password:e.target.value})}
            />
            {
              showPass ? <FaRegEyeSlash size='20px' onClick={showPassHandler} /> : <FaRegEye size='20px' onClick={showPassHandler} /> 
            }
         </div>
          <button onClick={registerHandler}>Register 
            {
                isLoading ?<FaSpinner className={styles.spin} />:''
            }
          </button>
          <div className={styles.notRegistered} >
            Already registered
            <Link href='/auth/login'> <span>Login</span> </Link>
          </div>
        </form>
      </div>
  )
}

export default Register

export async function getServerSideProps(context){
  const tokenPayload = validateToken(context)
  if(tokenPayload){
    return {
      redirect: {destination: '/dashboard'}
    }
  }
  return {
    props: {}
  }
}