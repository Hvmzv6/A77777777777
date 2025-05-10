import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { logout } from "../store/auth/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <Button onClick={handleLogout} color="primary" variant="contained">
      Logout
    </Button>
  );
};

export default LogoutButton;
