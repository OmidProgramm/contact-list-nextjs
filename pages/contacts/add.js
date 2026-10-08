import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import styles from '../../styles/addContact.module.css'

const AddConntact = () => {
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
      const res = await fetch("http://localhost:3000/api/contacts",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      toast.success("new Contact added successfully.")
    }else{
      toast.error("please fill in all fileds")
    }
  }
  return (
    <>
    <Toaster/>
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
          <button onClick={addContactHandler}>Add to Cantact</button>
        </form>
      </div>
    </>
  )
}

export default AddConntact