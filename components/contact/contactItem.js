import Link from 'next/link'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdDeleteForever, MdOutlineFavoriteBorder } from 'react-icons/md'
import styles from './contactItem.module.css'

const ContactItem = ({_id,firstName, lastName, age, gender,phone,contacts,setContacts}) => {
    const deleteHandler = async ()=>{
        const res = await fetch(`/api/contacts/${_id}`,{method:'DELETE'})
        const data = await res.json()
        console.log(data)
        const filteredContacts = contacts.filter(contact=>contact._id != _id)
        setContacts(filteredContacts)
    }
    return (
    <div className={styles.card}>
        <div className="name">
            <b>FirstName: </b> {firstName}
        </div>
        <div className="family">
            <b>LastName: </b> {lastName}
        </div>
        <div className="gender">
            <b>Gender: </b> {gender}
        </div>
        <div className="age">
            <b>Age: </b> {age}
        </div>
        <div className="phone">
            <b>Phone: </b> {phone}
        </div>
        <div className={styles.icons}>
                <div className="delete">
                    <MdDeleteForever onClick={()=>deleteHandler(_id)}/>
                </div>
            <div className="edit">
                <Link href='#'>
                    <AiFillEdit/>
                </Link>
            </div>
            <div className="favorite">
                <MdOutlineFavoriteBorder/>
            </div>
        </div>
    </div>
  )
}

export default ContactItem