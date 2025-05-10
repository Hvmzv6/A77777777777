import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import NavBar from "../components/NavBar";
import DashContainer from "../components/DashContainer";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const drawerWidth = 140;
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <SideMenu
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <DashContainer
        open={open}
        sx={{ display: "flex", flexDirection: "column", mt: "7vh", gap: 5 }}
      >
        <Outlet />
      </DashContainer>
    </div>
  );
};

export default Layout;
