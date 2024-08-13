import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import FeedBackTable from './table';
function FeedBack() {


  return (
    
     <div className='d-flex'>
     <Sidebar />
     <div className='wrapper_full' >
     <Header  />
     <FeedBackTable />
     </div> 
 </div>
  )
}

export default FeedBack;
