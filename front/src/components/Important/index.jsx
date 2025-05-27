import React from 'react'
import ItemPanel from '../Common/ItemPanel'
import Navbar from '../Common/Navbar'

const index = () => {
  return (
    <div className='page_section'>
      <Navbar />
      <ItemPanel pageTitle="Important Items" />
    </div>
  )
}

export default index
