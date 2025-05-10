import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  disabled = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        fontWeight: 600,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
