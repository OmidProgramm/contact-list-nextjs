import React, { useState } from 'react'
import styles from '@/styles/addContact.module.css'
import Link from 'next/link'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(true)

  const showPassHandler = ()=>setShowPass(!showPass)

  return (
    <>
       <div className={styles.container}>
        <form>
          <input type="numbtexter" name='email' placeholder='your Email'/>
         <div className={styles.password}>
            <input type={showPass?"text":'password' }  name='password' placeholder='your Password'/>
            {
              showPass ? <FaRegEyeSlash size='20px' onClick={showPassHandler} /> : <FaRegEye size='20px' onClick={showPassHandler} /> 
            }
           
         </div>
          <button>Login</button>
          <div className={styles.notRegistered} >
            Not registered
            <Link href='/auth/register'>Create an accoutn</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login