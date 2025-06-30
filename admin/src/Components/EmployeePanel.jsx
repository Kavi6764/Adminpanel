import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';

const EmployeePanel = () => {
  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeePanel;
