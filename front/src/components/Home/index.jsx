import React from 'react'
import ItemPanel from '../Common/ItemPanel'
import Navbar from '../Common/Navbar'

const index = () => {
  return (
    <div className='page_section'>
      <Navbar activeIdx={0} />
      <ItemPanel pageTitle="All Items" />
    </div>
  )
}

export default index;