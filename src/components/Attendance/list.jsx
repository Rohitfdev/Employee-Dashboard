import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import LeaveTable from './table';
import AttendanceTable from './table';
function Attandance() {


  return (
    
     <div className='d-flex'>
     <Sidebar />
     <div className='wrapper_full' >
     <Header  />
     <AttendanceTable />
     </div> 
 </div>
  )
}

export default Attandance;
