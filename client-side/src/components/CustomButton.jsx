import { Button } from "@mui/material";

const CustomButton = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  type,
  disabled = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      type={type}
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
