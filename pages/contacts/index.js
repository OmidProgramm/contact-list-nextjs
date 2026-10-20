import ContactItem from '@/components/contact/contactItem'
import Contact from '@/models/Contact'
import connectDB from '@/utils/connectDB'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Contacts.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router'
import validateToken from '@/utils/auth'
import generateFilter from '@/utils/generateFilter'
import {MdOutlineFavoriteBorder } from 'react-icons/md'

const Contacts = ({contactsList,user_id}) => {
  const [contacts, setContacts] = useState(contactsList)
  const [searchKey, setSearchKey] = useState('')
  const [searchGen, setSearchGen] = useState('')
  const [favStatus, setFavStatus] = useState(false)
  const router = useRouter()
  const {gen, search} = router.query

  useEffect(()=>{
    gen ? setSearchGen(gen): setSearchGen('')
    search ? setSearchKey(search): setSearchGen('')
  },[])

  const searchHandler = async ()=>{
    try {
      const res = await fetch(`/api/contacts?user_id=${user_id}&gen=${searchGen}&search=${searchKey}`)
      const data = await res.json()
      setContacts(data)
    } catch (error) { 
      toast.error("Server Error")
    }
  }
  const showFavoriteHandler = ()=>{
    if(favStatus){
      setContacts(contactsList)
    }else{
      const favoriteContacts = contacts.filter(contact=> contact.favorite == true)
      setContacts(favoriteContacts)
    }
    setFavStatus(!favStatus)
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
      <MdOutlineFavoriteBorder size='35px' fill={favStatus?'red': 'black' } 
        onClick={showFavoriteHandler}
      />
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
   if (!tokenPayload) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }
  const user_id = tokenPayload.user_id
  const filter = generateFilter(context.query,user_id)
 
  await connectDB()
  const contacts =  await Contact.find(filter)

  return {
    props: {contactsList: JSON.parse(JSON.stringify(contacts)),user_id: user_id.toString()} 
  }
}

