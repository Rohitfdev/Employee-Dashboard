import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import ReportsTable from './table';
function Reports() {


  return (
    
     <div className='d-flex'>
     <Sidebar />
     <div className='wrapper_full' >
     <Header  />
     <ReportsTable />
     </div> 
 </div>
  )
}

export default Reports;
