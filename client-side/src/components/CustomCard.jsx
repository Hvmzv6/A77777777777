import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import CustomButton from "./CustomButton";

const CustomCard = ({
  title,
  discription,
  trainer,
  buttonText,
  onButtonClick,
  buttonIcon,
  media,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        color: "#fff",
        borderRadius: "10px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // alignItems: "center",
        gap: "8px",
        width: "100%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {media && (
        <Box
          sx={{
            width: "100%",
            height: "100px",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <img
            src={media}
            alt="Card Media"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      )}
      <div className="flex flex-col items-start gap-1 justify-center">
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body1" color="gray">
          {discription} days
        </Typography>
        <Typography variant="body1" color="gray">
          {trainer}
        </Typography>
      </div>
      <CustomButton size="large" onClick={onButtonClick}>
        {buttonText} {buttonIcon}
      </CustomButton>
    </Box>
  );
};

export default CustomCard;
