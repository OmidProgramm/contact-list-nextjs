import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner7 } from "react-icons/im";
import styles from '../../styles/addContact.module.css'

const AddConntact = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    age:'',
    gender:'',
    phone:''
  })
  const addContactHandler = async (e)=>{
    e.preventDefault()
    
    const {firstName,lastName, age, gender, phone} = formData
    if(firstName &&lastName && age && gender && phone){
      setLoading(true)
      const res = await fetch("http://localhost:3000/api/contacts",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      if(res.status ==422){
        return toast.error(data.message)
      }
      if(res.status ==500){
        return toast.error(data.message)
      }
      toast.success("new Contact added successfully.")
    }else{
      toast.error("please fill in all fileds")
    }
  }
  return (
    <>
    <Toaster position='top-right'/>
      <div className={styles.container}>
        <form>
          <input type="text" name='firstName' placeholder='First Name'
          onChange={(e)=>setFormData({...formData,firstName:e.target.value})}
          />
          <input type="text" name='lastName' placeholder='Last Name'
          onChange={(e)=>setFormData({...formData,lastName:e.target.value})}
          />
          <input type="number" name='age' placeholder='your Age'
          onChange={(e)=>setFormData({...formData,age:e.target.value})}
          />
          <select value={formData.gender} onChange={(e)=>setFormData({...formData,gender:e.target.value})}>
            <option value="" hidden disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="text" name='phone' placeholder='your Phone'
          onChange={(e)=>setFormData({...formData,phone:e.target.value})}
          />
          <button onClick={addContactHandler}>
            Add to Cantact 
            { loading ? <ImSpinner7 className={styles.spin}/> : ''}
          </button>
        </form>
      </div>
    </>
  )
}

export default AddConntact