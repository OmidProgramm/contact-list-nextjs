import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";

export default function Home() {
  const [isCodeSend, setIsCodeSend] = useState(false)
  return (
    <>
     <div style={{textAlign:'center',paddingTop:'40px'}}>
         <h3>Contact List</h3>
     </div>
     <form className={styles.otpForm}>

      {
        !isCodeSend && (
          <div>
            <h2>Send Panel</h2>
            <label htmlFor="">Enter your Number</label>
            <input type="text" placeholder='Phone Number' />
            <button>Submit Code</button>
          </div>
        )
      }

      {
        isCodeSend && (
            <div>
              <div className={styles.prevStep}>
                  <FaArrowLeft />
                  <span>Back</span>
              </div>
              <h2>Submit Number</h2>
              <label htmlFor="">Enter Code</label>
              <input type="text" placeholder='Code' />
              <p className={styles.tryAgain}>send again...</p>
              <button>Submit Code</button>
            </div>
        )
      }

     

     </form>
    </>
  );
}
