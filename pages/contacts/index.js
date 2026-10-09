import ContactItem from '@/components/contact/contactItem'
import Contact from '@/models/Contact'
import connectDB from '@/utils/connectDB'
import React from 'react'

const Contacts = ({contacts}) => {
  console.log(contacts)
  return (
    <>
    {
      contacts && contacts.map((contact)=>{
        return <ContactItem key={contact._id} {...contact}/>
      })
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
    props: {contacts: JSON.parse(JSON.stringify(contacts))}
  }
}