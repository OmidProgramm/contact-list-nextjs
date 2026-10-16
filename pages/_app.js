import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {

  const [checkAuth, setCheckAuth] = useState(false)

    useEffect(()=>{
        const isAuth = async ()=>{
            const res = await fetch("/api/auth/me")
            if(res.status == 401){
                setCheckAuth(false)
            }else{
                setCheckAuth(true)
            }
        }
        isAuth()
    },[])

  return (
    <>
      <Toaster position='top-right'/>
      <Navbar checkAuth={checkAuth} setCheckAuth={setCheckAuth} />
      <Component {...pageProps} checkAuth={checkAuth} setCheckAuth={setCheckAuth}/>
    </>
  );
}
