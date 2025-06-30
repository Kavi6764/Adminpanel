import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  AccountCircle, Edit, EventNote, ListAlt, Lock, Logout
} from '@mui/icons-material';

const EmployeeSidebar = () => {
  const navItems = [
    { label: 'DashBoard', to: '', icon: <AccountCircle /> },
    { label: 'Update Profile', to: 'update-profile', icon: <Edit /> },
    { label: 'Leave Apply', to: 'leave-apply', icon: <EventNote /> },
    { label: 'Leave List', to: 'leave-list', icon: <ListAlt /> },
    { label: 'Change Password', to: 'change-password', icon: <Lock /> },
    { label: 'Logout', to: '/', icon: <Logout /> },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List sx={{ width: 240 }}>
        {navItems.map((item, index) => (
          <ListItem button key={index} component={NavLink} to={item.to} activeClassName="Mui-selected">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default EmployeeSidebar;
