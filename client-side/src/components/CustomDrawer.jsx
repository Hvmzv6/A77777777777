import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider, styled, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import React from "react";
import CustomIconButton from "./CustomIconButton";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingInline: 40,
  paddingBlock: 30,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const CustomDrawer = ({
  open,
  onClose,
  children,
  width = "40vw",
  sx,
  title,
}) => {
  const theme = useTheme();
  return (
    <Drawer
      anchor="right"
      color="background.alt"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderTopLeftRadius: "2rem",
          borderBottomLeftRadius: "2rem",
        },
        ...sx,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <DrawerHeader>
        <Typography variant="h4">{title}</Typography>
        <CustomIconButton
          color={theme.palette.primary.contrastText}
          bgColor={theme.palette.background.alt}
          hoverBgColor={theme.palette.background.brighter}
          onClick={onClose}
          icon={<ChevronRightIcon />}
        />
      </DrawerHeader>
      <div className="flex items-center gap-2 justify-center">
        <Divider sx={{ width: "90%" }} />
      </div>
      <Box role="presentation" sx={{ width }}>
        {children}
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
