import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import ReimbursementsTable from './table';
function Reimbursement() {


  return (
    
     <div className='d-flex'>
     <Sidebar />
     <div className='wrapper_full' >
     <Header  />
     <ReimbursementsTable />
     </div> 
 </div>
  )
}

export default Reimbursement;
