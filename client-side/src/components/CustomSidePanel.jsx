import { Box, useTheme } from "@mui/material";
import React from "react";

const CustomSidePanel = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "30%",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.alt,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default CustomSidePanel;
