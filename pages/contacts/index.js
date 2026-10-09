import ContactItem from '@/components/contact/contactItem'
import Contact from '@/models/Contact'
import connectDB from '@/utils/connectDB'
import React, { useState } from 'react'
import styles from '@/styles/Contacts.module.css'

const Contacts = ({contactsList}) => {
  const [contacts, setContacts] = useState(contactsList)
  const [searchKey, setSearchKey] = useState('')
  const [searchGen, setSearchGen] = useState('')

  const searchHandler = async ()=>{
    const res = await fetch(`/api/contacts?gen=${searchGen}&search=${searchKey}`)
    const data = await res.json()
    setContacts(data)
  }

  return (
    <>
    <div className={styles.searchContainer}>
      <input type="text" placeholder='enter name or family' onChange={(e)=>setSearchKey(e.target.value)} />
      <select onChange={(e)=>setSearchGen(e.target.value)}>
        <option value="">all</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <button onClick={searchHandler}>search</button>
    </div>
    {
      contacts.length > 0 && (
        <>
          {
            contacts.map((contact)=>(
              <ContactItem key={contact._id} {...contact}/>
            ))
          }
        </>
      )
    }
    {
      contacts.length == 0 && <p className={styles.noAudience}>Tere is no audience</p>
    }
      
  </>
  )
}

export default Contacts
export async function getServerSideProps(){
  await connectDB()
  const contacts = await Contact.find().lean()
  /* const res = await fetch("http://localhost:3000/api/contacts")
  const data = await res.json() */
  return {
    props: {contactsList: JSON.parse(JSON.stringify(contacts))}
  }
}