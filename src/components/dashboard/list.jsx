import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import OrderTable from './table';
import Header from '../Header/Header';
function Dashboard() {


  return (
    
     <div className='d-flex'>
     <Sidebar 
  
     />
     <div
    
      className='wrapper_full'

      >
     <Header  />
     <OrderTable />
     </div> 
 </div>
  )
}

export default Dashboard;
