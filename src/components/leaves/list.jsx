import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import LeaveTable from './table';
function Leaves() {


  return (
    
     <div className='d-flex'>
     <Sidebar />
     <div className='wrapper_full' >
     <Header  />
     <LeaveTable />
     </div> 
 </div>
  )
}

export default Leaves;
