import React, { useState } from 'react';
import { Typography, Button, TextField, Paper, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
      department: '',
      salary: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      role: Yup.string().required('Role is required'),
      department: Yup.string().required('Department is required'),
      salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
    }),
    onSubmit: async(values, { resetForm }) => {
      if (editIndex !== null) {
        // const updated = [...employees];
        // updated[editIndex] = values;
      await axios.put(`http://localhost:5000/HR/update-employee/${editIndex}`, values);
    
    // update frontend
    const updatedList = employees.map(emp => 
      emp.id === editIndex ? { ...emp, ...values } : emp
    );
        setEmployees(updatedList);
        setEditIndex(null);
      } else {
        const res =await axios.post("http://localhost:5000/HR/add-employee",values)
        console.log("res",res.data.employee)
        setEmployees([...employees, res.data.employee]);
      }
      resetForm();
    },
  });
const handleEdit = (id) => {
  const empToEdit = employees.find((emp) => emp.id === id);
  if (empToEdit) {
    formik.setValues(empToEdit);
    setEditIndex(id);
  }
};


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/HR/delete-employee/${id}`)
    const filtered = employees.filter((emp, i) => emp.id !== id);
    setEmployees(filtered);
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className="p-6 space-y-6">
      <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>Employee Management</Typography>
      <Typography>Manage your team members and their information</Typography>

      <Paper elevation={3} className="p-4 space-y-4">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextField
            fullWidth label="Name" name="name" value={formik.values.name}
            onChange={formik.handleChange} error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth label="Email" name="email" value={formik.values.email}
            onChange={formik.handleChange} error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth select label="Role" name="role" value={formik.values.role}
            onChange={formik.handleChange} error={formik.touched.role && !!formik.errors.role}
            helperText={formik.touched.role && formik.errors.role}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </TextField>
          <TextField
            fullWidth label="Department" name="department" value={formik.values.department}
            onChange={formik.handleChange} error={formik.touched.department && !!formik.errors.department}
            helperText={formik.touched.department && formik.errors.department}
          />
          <TextField
            fullWidth label="Salary" name="salary" value={formik.values.salary}
            onChange={formik.handleChange} error={formik.touched.salary && !!formik.errors.salary}
            helperText={formik.touched.salary && formik.errors.salary}
          />
          <Button type="submit" variant="contained" color="primary">
            {editIndex !== null ? 'Update Employee' : 'Add Employee'}
          </Button>
        </form>
      </Paper>

      {/* Employee List */}
      <div className="space-y-2">
        {employees.map((emp, index) => (
          <Paper key={index} className="flex justify-between items-center p-4">
            <div>
              <Typography className="font-semibold">{emp.name}</Typography>
              <Typography>{emp.email}</Typography>
              <Typography>{emp.role} - {emp.department}</Typography>
              <Typography>Salary: ₹{emp.salary}</Typography>
            </div>
            <div className="space-x-2">
              <Button variant="outlined" onClick={() => handleEdit(emp.id)}>Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(emp.id)}>Delete</Button>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Employee;
