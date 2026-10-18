import ContactItem from '@/components/contact/contactItem'
import Contact from '@/models/Contact'
import connectDB from '@/utils/connectDB'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Contacts.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router'
import validateToken from '@/utils/auth'

const Contacts = ({contactsList}) => {
  const [contacts, setContacts] = useState(contactsList)
  const [searchKey, setSearchKey] = useState('')
  const [searchGen, setSearchGen] = useState('')
  const router = useRouter()
  const {gen, search} = router.query

  useEffect(()=>{
    gen ? setSearchGen(gen): setSearchGen('')
    search ? setSearchKey(seerch): setSearchGen('')
  },[])

  const searchHandler = async ()=>{
    try {
      const res = await fetch(`/api/contacts?gen=${searchGen}&search=${searchKey}`)
      const data = await res.json()
      setContacts(data)
    } catch (error) {
      toast.error("Server Error")
    }
  }

  return (
    <>
    <Toaster position='top-right'/>
    <div className={styles.searchContainer}>
      <input type="text" placeholder='enter name or family' onChange={(e)=>setSearchKey(e.target.value)} 
        value={searchKey}
      />
      <select onChange={(e)=>setSearchGen(e.target.value)}>
        <option value="" selected={searchGen == ''} >all</option>
        <option value="male" selected={searchGen == 'male'} >male</option>
        <option value="female" selected={searchGen == 'female'} >female</option>
      </select>
      <button onClick={searchHandler}>search</button>
    </div>
    {
      contacts.length > 0 && (
        <>
          {
            contacts.map((contact)=>(
              <ContactItem key={contact._id} {...contact} contacts={contacts} setContacts={setContacts}/>
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

export async function getServerSideProps(context){
  const tokenPayload = validateToken(context)
  const {user_id} = tokenPayload
  await connectDB()
 
  let contacts = null
        const {gen,search} = context.query
        if(gen && search){
          if(gen == 'male' || gen == 'female'){
            contacts = await Contact.find({
              gender:gen,
              $or:[{firstName:search},{lastName:search}],
              user_id
            })
          }else{
            contacts = await Contact.find({
              $or:[{firstName:search},{lastName:search}],
              user_id
            })
          }
        }else if(gen){
            if(gen == 'male'){
                contacts = await Contact.find({gender:'male',user_id})
            }else if(gen == 'female'){
                contacts = await Contact.find({gender:'female',user_id})
            }else{
                contacts = await Contact.find({user_id})
            } 
        }else if(search){
            contacts = await Contact.find({
              $or: [{firstName: search},{lastName:search}],
              user_id
            })
        }else{
            contacts = await Contact.find({user_id})
        }

  return {
    props: {contactsList: JSON.parse(JSON.stringify(contacts))}
  }
}