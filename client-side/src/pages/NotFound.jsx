import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const NotFound = () => {
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 ">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-lg">Page Not Found</p>
      <CustomButton
        color="primary"
        variant="contained"
        onClick={() => handlePageChange()}
      >
        Go Back
      </CustomButton>
    </div>
  );
};

export default NotFound;
