import Link from 'next/link'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdDeleteForever, MdOutlineFavoriteBorder } from 'react-icons/md'

const ContactItem = () => {
  return (
    <div className='card'>
        <div className="name">
            <b>FirstName: </b> Person
        </div>
        <div className="family">
            <b>LastName: </b> Person
        </div>
        <div className="gender">
            <b>Gender: </b> Male
        </div>
        <div className="age">
            <b>Age: </b> 18
        </div>
        <div className="phone">
            <b>Phone: </b> 0123456789
        </div>
        <div className="icons">
            <MdDeleteForever/>
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
  )
}

export default ContactItem