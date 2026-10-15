import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import toast, { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster position='top-right'/>
      <Navbar/>
      <Component {...pageProps} />
    </>
  );
}
