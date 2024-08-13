import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import FeedBackTable from './table';
import DailyTimesheetTable from './table';
function DailyTimesheet() {


  return (
    
     <div className='d-flex'>
     <Sidebar />
     <div className='wrapper_full' >
     <Header  />
     <DailyTimesheetTable />
     </div> 
 </div>
  )
}

export default DailyTimesheet;
