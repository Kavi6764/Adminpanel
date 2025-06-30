import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
import LoginPage from './Components/AdminandEmp';
import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './Components/AdminPanel';
import Dashboard from './Pages/Admin/Dashboard';
import LeaveType from './Pages/Admin/LeaveType';
import Employee from './Pages/Admin/Employee';
import ChangePasswordForm from './Pages/Admin/Changepassword';
import LeaveManagement from './Pages/Admin/Leavemangement';
import EmployeePanel from './Components/EmployeePanel';
import EmployeeDashboard from './Pages/Employee/EmpDashboard';
import UpdateProfileForm from './Pages/Employee/Update-Profile';
import LeaveHistory from './Pages/Employee/LeaveList';
import UpdatePasswordForm from './Pages/Employee/UpdatePassword';
import LeaveForm from './Pages/Employee/LeaveForm';

const App = () => {
  return (
    <div>
      <Routes>
         <Route path='/' element={<Login/>} />
         <Route path='/admin/' element={<AdminPanel/>}> 
         <Route index element={<Dashboard/>} />
         <Route path='leavetype' element={<LeaveType/>} />
         <Route path='employee' element={<Employee/>} />
         <Route path='leave-management' element={<LeaveManagement/>} />
         <Route path='change-password' element={<ChangePasswordForm/>} />
          </Route>
          <Route path='/employee' element={<EmployeePanel/>}>
           <Route index element={<EmployeeDashboard/>} />
           <Route path='update-profile' element={<UpdateProfileForm/>} />
           <Route path='leave-apply' element={<LeaveForm/>} />
            <Route path='leave-list' element={<LeaveHistory/>} />
           <Route path='change-password' element={<UpdatePasswordForm/>} />
          </Route>
      </Routes>
    </div>
  )
}

export default App