import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import logo from "../assets/logo.png";
import RenderFormField from "../components/RenderFormField";
const loginFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(""); // State for error message

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`http://Localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const token = data.token;
      console.log("🚀 ~ onSubmit ~ token:", token);
      const decodedToken = jwtDecode(token);
      console.log("🚀 ~ onSubmit ~ decodedToken:", decodedToken);
      const role = decodedToken.role;
      // Save token to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      // Dispatch login action to Redux store
      // dispatch(login({ token, role }));

      // Redirect based on role
      if (role === "Admin") {
        navigate("/dashboard");
      } else if (role === "Trainer") {
        navigate("/dashboard");
      } else if (role === "Company") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  // const { formValues, handleChange, handleSubmit } = useForm(onSubmit);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 600,
          px: 8,
          height: "60%",
          background: theme.palette.background.alt,
          borderRadius: 10,
        }}
      >
        <img src={logo} alt="logo" width={100} />
        <Typography variant="h1">Login!</Typography>
        <Typography>Please enter your credentials below to continue</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          {loginFields.map((field, index) => (
            <RenderFormField
              key={index}
              index={index}
              field={field}
              control={control}
              errors={errors}
            />
          ))}

          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </form>
        {loginError && (
          <Typography variant="body" color="error" sx={{ width: "100%" }}>
            {loginError}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
