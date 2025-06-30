import React, { useState } from 'react';
import { Button, Paper, Typography, MenuItem, Select } from '@mui/material';

const LeaveManagement = () => {
  const [leaveApplications, setLeaveApplications] = useState([
    { id: 1, name: 'John', reason: 'Sick Leave', status: 'pending' },
    { id: 2, name: 'Sara', reason: 'Vacation', status: 'approved' },
    { id: 3, name: 'Mike', reason: 'Personal', status: 'rejected' },
  ]);
  const [filter, setFilter] = useState('all');

  const handleAction = (id, action) => {
    const updated = leaveApplications.map(app =>
      app.id === id ? { ...app, status: action } : app
    );
    setLeaveApplications(updated);
  };

  const filteredApps = leaveApplications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h4" className="font-bold">Leave Management</Typography>
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-4">
        <MenuItem value="all">All Applications</MenuItem>
        <MenuItem value="approved">Approved</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
      </Select>

      {filteredApps.length === 0 ? (
        <Typography>No applications found.</Typography>
      ) : (
        filteredApps.map(app => (
          <Paper key={app.id} className="p-4 flex justify-between items-center">
            <div>
              <Typography className="font-semibold">{app.name}</Typography>
              <Typography>Reason: {app.reason}</Typography>
              <Typography>Status: {app.status}</Typography>
            </div>
            {app.status === 'pending' && (
              <div className="space-x-2">
                <Button variant="contained" color="success" onClick={() => handleAction(app.id, 'approved')}>
                  Approve
                </Button>
                <Button variant="contained" color="error" onClick={() => handleAction(app.id, 'rejected')}>
                  Reject
                </Button>
              </div>
            )}
          </Paper>
        ))
      )}
    </div>
  );
};

export default LeaveManagement;
