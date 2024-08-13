import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import WorkLogTable from './table';
function WorkLog() {


  return (
    
     <div className='d-flex'>
     <Sidebar />
     <div className='wrapper_full' >
     <Header  />
     <WorkLogTable />
     </div> 
 </div>
  )
}

export default WorkLog;
