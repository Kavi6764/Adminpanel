import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const EmployeeDashboard = () => {
  const employeeName = 'John Doe'; // Replace with dynamic name if needed
  const totalLeaves = 5;
  const workingDays = 22;

  return (
    <div className="p-6">
      <Typography variant="h4" className="text-center font-bold mb-6 text-blue-600">
        Welcome back, {employeeName}!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Leaves Taken
              </Typography>
              <Typography variant="h4" color="primary">
                {totalLeaves}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Working Days This Month
              </Typography>
              <Typography variant="h4" color="primary">
                {workingDays}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeDashboard;
