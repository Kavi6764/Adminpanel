import { NavLink } from "react-router-dom";
import { People, Work, Logout, Lock, Assignment, Apartment } from "@mui/icons-material";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 space-y-4">
      <NavLink to="" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
        <Apartment /> Department
      </NavLink>
      <NavLink to="leavetype" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
        <Assignment /> Leave Type
      </NavLink>
      <NavLink to="employee" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
        <People /> Employee
      </NavLink>
      <NavLink to="leave-management" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
        <Work /> Leave Management
      </NavLink>
      <NavLink to="change-password" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
        <Lock /> Change Password
      </NavLink>
      <NavLink to="/" className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
        <Logout /> Logout
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
