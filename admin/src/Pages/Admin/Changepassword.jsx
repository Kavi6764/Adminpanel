import React from 'react';
import {
  Box, Typography, Grid, TextField, Button, Paper, InputAdornment, IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Lock, LockOpen, LockReset } from '@mui/icons-material';

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string().min(6, 'Minimum 6 characters').required('New Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function ChangePasswordPage() {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Change Password:', values);
      // call API here
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f4f6"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          🔒 Change Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                {...formik.getFieldProps('currentPassword')}
                error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                {...formik.getFieldProps('newPassword')}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpen />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                {...formik.getFieldProps('confirmNewPassword')}
                error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockReset />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                Update Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
