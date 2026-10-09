import ContactItem from '@/components/contact/contactItem'
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
  const res = await fetch("http://localhost:3000/api/contacts")
  const data = await res.json()
  return {
    props: {contacts:data}
  }
}