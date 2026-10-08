import React from 'react'
import styles from '../../styles/addContact.module.css'

const AddConntact = () => {
  return (
    <>
      <div className={styles.container}>
        <form>
          <input type="text" name='firstName' placeholder='First Name'/>
          <input type="text" name='lastName' placeholder='Last Name'/>
          <input type="number" name='age' placeholder='your Age'/>
          <select name="gender" id="">
            <option value="" selected hidden disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="text" name='phone' placeholder='your Phone'/>
          <button>Add to Cantact</button>
        </form>
      </div>
    </>
  )
}

export default AddConntact