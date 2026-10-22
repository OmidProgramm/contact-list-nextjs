import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { ImSpinner7 } from "react-icons/im";
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa6';

export default function Home() {
  const [isCodeSend, setIsCodeSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phone,setPhone] = useState('')
  const [timer,setTimer] = useState(0)
  const [code, setCode] = useState('')

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
      setTimer(30)
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
      return () => {
        clearInterval(interval)
      }
  },[timer])

  const verifyCodeHandler = async (e)=>{
    e.preventDefault()
    if(code.length != 4){
      return toast.error("Length of Code is invalid")
    }
    try {
      const res = await axios.post('http://localhost:3000/api/sms/verify',{phone,code})
      if(res.status == 202){
         return toast.success("Code is accepted")
      }
      
    } catch (error) {
      console.log(error)
      if(error.response.status == 410){
       toast.error("Code is expired")
      }else if(error.response.status == 401){
        toast.error("Code is invalid")
      }
    }
  }
  const resendCodeHandler = async () =>{
    
    setLoading(true)
    setCode('')
    const res = await axios.post('/api/sms/send',{phone})
    console.log(res)
    setLoading(false)
    if(res.status == 200){
      toast.success('The Code resende again')
      setTimer(30)
    }

  }

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
              <input type="text" placeholder='Code' onChange={(e)=>setCode(e.target.value)}/>
              {
                timer > 0 ? (
                  <p className={styles.tryAgain}>remind Time: {timer} </p>
                ):(<p className={styles.sendAgain} onClick={resendCodeHandler}>
                  {
                    loading ? (
                        <ImSpinner7 className={styles.spiner}/>
                    ):('send again..')
                  }
                  </p>)
              }
              <button onClick={verifyCodeHandler}>Submit Code</button>
            </div>
        )
      }
     </form>
    </>
  );
}
