import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { ImSpinner7 } from "react-icons/im";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [isCodeSend, setIsCodeSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phone,setPhone] = useState('')
  const [timer,setTimer] = useState(0)

  const sendCodeHandler = async (e)=>{
    e.preventDefault()
    if(!phone || !phone.startsWith('01')){
       return toast.error("enter phone correct")
    }
    setLoading(true)
    const res = await axios.post('http://localhost:3000/api/sms/send',{phone})
    console.log(res)
    setLoading(false)
    if(res.status == 200){
      setIsCodeSend(true)
      setTimer(20)
    }
  }
  const prevStepHandler = ()=>{
    setIsCodeSend(false)
    setPhone('')
  }

  useEffect(()=>{
    let interval 
      if(timer > 0){
        interval =  setInterval(()=>{
          setTimer(timer => timer - 1)
        },1000)
      }
      return () =>{
        clearInterval(interval)
      }
  },[timer])

  return (
    <>
    <Toaster position='top-right'/>
     <div style={{textAlign:'center',paddingTop:'40px'}}>
         <h3>Contact List</h3>
     </div>
     <form className={styles.otpForm}>

      {
        !isCodeSend && (
          <div>
            <h2>Send Panel</h2>
            <label htmlFor="">Enter your Number</label>
            <input type="text" placeholder='Phone Number' onChange={(e)=>setPhone(e.target.value)}/>
            <button onClick={sendCodeHandler}>
              Send Code
              { loading ? <ImSpinner7 className={styles.spiner}/> : ''}
              </button>
          </div>
        )
      }

      {
        isCodeSend && (
            <div>
              <div className={styles.prevStep} onClick={prevStepHandler}>
                  <FaArrowLeft />
                  <span>Back</span>
              </div>
              <h2>Submit Number</h2>
              <label htmlFor="">Enter Code</label>
              <input type="text" placeholder='Code' />
              {
                timer > 0 ? (
                  <p className={styles.tryAgain}>remind Time: {timer} </p>
                ):(<p className={styles.sendAgain}>send again..</p>)
              }
              
              <button>Submit Code</button>
            </div>
        )
      }

     

     </form>
    </>
  );
}
