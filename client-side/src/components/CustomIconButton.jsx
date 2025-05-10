import EditIcon from "@mui/icons-material/Edit"; // Example icon
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

const CustomIconButton = ({
  icon = <EditIcon />,
  onClick,
  tooltip = "",
  color = "primary",
  size = "medium",
  bgColor = "transparent",
  hoverBgColor = null,
  sx = {},
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        sx={{
          backgroundColor: bgColor,
          "&:hover": {
            backgroundColor: hoverBgColor || bgColor,
          },
          ...sx,
        }}
        onClick={onClick}
        color={color}
        size={size}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default CustomIconButton;
