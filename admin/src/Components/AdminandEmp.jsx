import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Tabs, Tab, Box, Typography } from "@mui/material";
import {
  AccountCircle,
  Lock,
  Login,
  Person,
  Shield,
  ShieldOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userType, setUserType] = useState("employee");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(4, "Too Short!").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        if (userType === "employee") {
          console.log("userTypr",userType)
          const res = await axios.post("http://localhost:5000/Emp/login", values);
          const user = res.data.user;
          console.log("Login success:", user);
          navigate("/employee", { state: { user } });
          console.log(values)
        } else if (userType === "admin") {
          const res = await axios.post(
            "http://localhost:5000/HR/login",
            values
          );
          const user = res.data.user;
          console.log("HR Login success:", user);
          navigate("/admin", { state: { user } });
        }
      } catch (err) {
        console.error("Login failed", err);
        alert("Invalid credentials or server error.");
      }
    },
  });

  const handleTabChange = (event, newValue) => {
    setUserType(newValue);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Box
        sx={{
          width: 400,
          mx: "auto",
          my: "auto",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <div className="text-center">
          <ShieldOutlined
            fontSize="large"
            className="w-8 h-8 text-indigo-600 box-content bg-indigo-100 p-3 rounded-full"
          />
          <h1 className="text-3xl font-semibold mt-2">Welcome back</h1>
          <p className="text-center text-slate-600 mt-3">
            Sign in to Your Account
          </p>
        </div>

        <Tabs value={userType} onChange={handleTabChange} centered>
          <Tab icon={<Shield />} label="Employee" value="employee" />
          <Tab icon={<Person />} label="Admin" value="admin" />
        </Tabs>

        <form onSubmit={formik.handleSubmit} style={{ marginTop: 20 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
            <AccountCircle sx={{ color: "action.active", mr: 1 }} />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", mb: 3, mt: 5, gap: 1 }}
          >
            <Lock sx={{ color: "action.active", mr: 1 }} />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="standard"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>

          <Button
            sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            <Login />
            Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default LoginPage;
