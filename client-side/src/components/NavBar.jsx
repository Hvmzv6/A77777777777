import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomIconButton from "./CustomIconButton";
import DarkModeButton from "./DarkModeButton";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, drawerWidth }) => ({
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `-${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const NavBar = ({ drawerWidth, open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/");
    handleClose();
  };

  return (
    <AppBar
      elevation={0}
      position="fixed"
      drawerWidth={drawerWidth}
      open={open}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center gap-2 justify-center">
          <CustomIconButton
            onClick={handleDrawerOpen}
            color={theme.palette.primary.contrastText}
            bgColor={theme.palette.background.alt}
            hoverBgColor={theme.palette.background.brighter}
            sx={[
              {
                mr: 2,
              },
            ]}
            icon={!open ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
          />

          <Typography
            sx={{ color: theme.palette.neutral.contrastText }}
            variant="h4"
          ></Typography>
        </div>
        <div className="flex gap-2 items-center">
          <DarkModeButton />
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            onClick={handleAvatarClick}
            sx={{ cursor: "pointer" }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "1rem",
                backgroundColor: "#292C2D",
                color: "#fff",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                marginTop: "1rem",
                paddingInline: "0.5rem",
              },
            }}
          >
            <MenuItem
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                gap: 1,
                width: "100%",
              }}
              onClick={handleProfile}
            >
              <AccountCircleIcon />
              Profile
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                gap: 1,
                width: "100%",
              }}
              onClick={handleLogout}
            >
              <LogoutIcon />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
