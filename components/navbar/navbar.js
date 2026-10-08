import Link from 'next/link';
import { MdAddBox } from "react-icons/md";
import { FaListOl } from "react-icons/fa6";
import styles from './navbar.module.css'
import { useRouter } from 'next/router';


const Navbar = () => {
    const {route} = useRouter()
  return (
    <div className= {styles.navbar}>
        <div className={styles.menu}>
            <Link href='/contacts/add' className={route == '/contacts/add'? styles.active:''}>
                <MdAddBox /> Add Contact
            </Link>
            <Link href='/contacts' className={route == '/contacts'? styles.active:''}>
                <FaListOl /> Contacts
            </Link>
        </div>
    </div>
  )
}

export default Navbar