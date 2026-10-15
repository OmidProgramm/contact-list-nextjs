import React, { useState } from 'react'
import styles from '@/styles/addContact.module.css'
import Link from 'next/link'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa6";

const Login = () => {
  const router = useRouter()
  const [showPass, setShowPass] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const showPassHandler = ()=>setShowPass(!showPass)
  
  const loginHandler = async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    const res = await fetch('http://localhost:3000/api/auth/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    })
    const data = await res.json()
    setIsLoading(false)
    if(res.status == 401 || res.status == 405 || res.status == 422 || res.status == 500){
        return toast.error(data.message,{duration:5000})
    }
    toast.success(data.message,{duration:5000})
    router.replace('/dashboard') 
  }

  return (
    <>
       <div className={styles.container}>
        <form>
          <input type="text" name='email' placeholder='your Email'
          onChange={(e)=>setEmail(e.target.value)}
          />
         <div className={styles.password}>
            <input type={showPass?"text":'password' }  name='password' placeholder='your Password'
            onChange={(e)=>setPassword(e.target.value)}
            />
            {
              showPass ? <FaRegEyeSlash size='20px' onClick={showPassHandler} /> : <FaRegEye size='20px' onClick={showPassHandler} /> 
            }
         </div>
          <button onClick={loginHandler}>Login
            {
                isLoading ?<FaSpinner className={styles.spin} />:''
            }
          </button>
          <div className={styles.notRegistered} >
            Not registered
            <Link href='/auth/register'> <span>Create an accoutn</span> </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login