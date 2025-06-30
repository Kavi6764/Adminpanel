import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Edit, Delete } from '@mui/icons-material';

const LeaveForm = () => {
  const [leaves, setLeaves] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      leaveType: '',
      fromDate: '',
      toDate: '',
      reason: '',
    },
    validationSchema: Yup.object({
      leaveType: Yup.string().required('Required'),
      fromDate: Yup.date().required('Required'),
      toDate: Yup.date().min(Yup.ref('fromDate'), 'End date must be after start').required('Required'),
      reason: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingIndex !== null) {
        const updated = [...leaves];
        updated[editingIndex] = values;
        setLeaves(updated);
        setEditingIndex(null);
      } else {
        setLeaves([...leaves, values]);
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    const selected = leaves[index];
    formik.setValues(selected);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = leaves.filter((_, i) => i !== index);
    setLeaves(updated);
  };

  return (
    <Box maxWidth="900px" mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {editingIndex !== null ? 'Edit Leave' : 'Apply for Leave'}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Leave Type"
                  name="leaveType"
                  value={formik.values.leaveType}
                  onChange={formik.handleChange}
                  error={formik.touched.leaveType && Boolean(formik.errors.leaveType)}
                  helperText={formik.touched.leaveType && formik.errors.leaveType}
                >
                  {['Sick Leave', 'Casual Leave', 'Annual Leave'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="From Date"
                  name="fromDate"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.fromDate}
                  onChange={formik.handleChange}
                  error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
                  helperText={formik.touched.fromDate && formik.errors.fromDate}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="To Date"
                  name="toDate"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.toDate}
                  onChange={formik.handleChange}
                  error={formik.touched.toDate && Boolean(formik.errors.toDate)}
                  helperText={formik.touched.toDate && formik.errors.toDate}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason"
                  name="reason"
                  multiline
                  rows={2}
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                  error={formik.touched.reason && Boolean(formik.errors.reason)}
                  helperText={formik.touched.reason && formik.errors.reason}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {editingIndex !== null ? 'Update Leave' : 'Submit Leave'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Leave Table */}
      {leaves.length > 0 && (
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leave Applications
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.map((leave, index) => (
                    <TableRow key={index}>
                      <TableCell>{leave.leaveType}</TableCell>
                      <TableCell>{leave.fromDate}</TableCell>
                      <TableCell>{leave.toDate}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(index)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(index)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default LeaveForm;
