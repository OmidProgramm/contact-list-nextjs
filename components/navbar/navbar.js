import Link from 'next/link';
import { MdAddBox,MdDashboard } from "react-icons/md";
import { CgLogIn, CgLogOut } from "react-icons/cg";
import { FaListOl } from "react-icons/fa6";
import styles from './navbar.module.css'
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Navbar = ({checkAuth,setCheckAuth}) => {
    const {route} = useRouter()
    const logoutHandler = async ()=>{
        const res = await fetch('/api/auth/logout')
        const data = await res.json()
        if(res.status == 200){
            toast.success(data.message)
            setCheckAuth(false)
        }else{
            toast.error('Error')
        }
    }
  return (
    <div className= {styles.navbar}>
        <div className={styles.menu}>
            {
                checkAuth ?  <Link href='/auth/login' className={route == '/auth/login'? styles.active:''}
                onClick={logoutHandler}
                >
                <CgLogOut /> Logout
            </Link> :
             <Link href='/auth/login' className={route == '/auth/login'? styles.active:''}>
                <CgLogIn /> Login
            </Link>
            }
            
            {
                checkAuth && (
                    <Link href='/contacts/add' className={route == '/contacts/add'? styles.active:''}>
                        <MdAddBox /> Add Contact
                    </Link>
                )
            }
            <Link href='/contacts' className={route == '/contacts'? styles.active:''}>
                <FaListOl /> Contacts
            </Link>
            {
                checkAuth && (
                    <Link href='/dashboard' className={route == '/dashboard'? styles.active:''}>
                        <MdDashboard /> Dashboard
                    </Link>
                )
            }
            
        </div>
    </div>
  )
}

export default Navbar