import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div className='flex'>
        <div className=''>
             <AdminSidebar />
        </div>
       <div className='flex-1'>
         <Outlet/>
       </div>
       
    </div>
  )
}

export default AdminPanel