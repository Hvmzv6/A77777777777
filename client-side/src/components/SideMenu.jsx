import { ChevronRightOutlined, SchoolRounded } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  display: "flex",
  alignItems: "center",
  gap: 70,
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const navItemsByRole = {
  admin: [
    {
      text: "Dashboard",
      icon: <BarChartIcon />,
      lcText: "dashboard",
      url: "dashboard",
    },
    {
      text: "Users",
      icon: <GroupIcon />,
      lcText: "users",
      url: "users",
    },
    {
      text: "Theme",
      icon: <FolderCopyIcon />,
      lcText: "theme",
      url: "theme",
    },
    {
      text: "Programs",
      icon: <SchoolRounded />,
      lcText: "programs",
      url: "programs",
    },
    {
      text: "Evaluations",
      icon: <TrendingUpIcon />,
      lcText: "evaluations",
      url: "evaluations",
    },
    {
      text: "Notifications",
      icon: <NotificationsActiveIcon />,
      lcText: "notifications",
      url: "notifications",
    },
  ],

  trainer: [
    {
      text: "Dashboard",
      icon: <BarChartIcon />,
      lcText: "dashboard",
      url: "dashboard",
    },
    {
      text: "training-programs",
      icon: (
        <LiaChalkboardTeacherSolid className="text-2xl text-center p-0 m-0" />
      ),
      lcText: "programs",
      url: "trainer-programs",
    },
    {
      text: "My Evaluations",
      icon: <TrendingUpIcon />,
      lcText: "evaluations",
      url: "trainer-evaluations",
    },
    {
      text: "Notifications",
      icon: <NotificationsActiveIcon />,
      lcText: "notifications",
      url: "trainer-notifications",
    },
  ],

  client: [
    {
      text: "Dashboard",
      icon: <BarChartIcon />,
      lcText: "dashboard",
      url: "dashboard",
    },
    {
      text: "participants",
      icon: <GroupsIcon />,
      lcText: "participants",
      url: "participants",
    },
    {
      text: "training request",
      icon: <ScheduleSendIcon />,
      lcText: "request-training",
      url: "client-programs",
    },
    {
      text: "Evaluations",
      icon: <TrendingUpIcon />,
      lcText: "evaluations",
      url: "client-evaluations",
    },
    {
      text: "Notifications",
      icon: <NotificationsActiveIcon />,
      lcText: "notifications",
      url: "client-notifications",
    },
  ],
};

const SideMenu = ({ open, drawerWidth }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const theme = useTheme();
  const userRole = localStorage.getItem("userRole");
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: theme.palette.background.alt,
          width: drawerWidth,
          boxSizing: "border-box",
        },
        "& .MuiPaper-root": {
          borderTopRightRadius: "2rem",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader sx={{ flexDirection: "column", gap: 2 }}>
        <img src={logo} alt="logo" width={70} />
      </DrawerHeader>
      <List
        className="custom-scrollbar"
        sx={{
          p: 2,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          overflowY: "auto",
        }}
      >
        {navItemsByRole[userRole].map(({ lcText, text, icon, url }, index) => {
          const isLastItem = index === navItemsByRole[userRole].length - 1;

          return (
            <Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${url}`);
                    setActive(lcText);
                  }}
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: "0.5rem",
                    backgroundColor:
                      active === lcText
                        ? theme.palette.primary.main
                        : "transparent",
                    color:
                      active === lcText
                        ? theme.palette.primary.contrastText
                        : "",
                    "&:hover": {
                      backgroundColor:
                        active === lcText
                          ? theme.palette.primary.light
                          : theme.palette.background.main,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                      color:
                        active === lcText
                          ? theme.palette.primary.contrastText
                          : "",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      fontWeight: "bold", // Make the text bold
                      textAlign: "center", // Ensure text alignment is consistent
                      color:
                        active === lcText
                          ? theme.palette.primary.contrastText
                          : theme.palette.text.primary,
                    }}
                    primary={text}
                  >
                    {active === lcText && (
                      <ChevronRightOutlined
                        sx={{
                          ml: "auto",
                        }}
                      />
                    )}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              {!isLastItem && <Divider sx={{ my: 1 }} />}
            </Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideMenu;
