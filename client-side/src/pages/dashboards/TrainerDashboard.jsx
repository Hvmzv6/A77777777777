import React from "react";
import DarkModeButton from "../../components/DarkModeButton";
import DashContainer from "../../components/DashContainer";
import SideMenu from "../../components/SideMenu";

const TrainerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideMenu />
      <div className="flex flex-col flex-grow">
        <DashContainer></DashContainer>
        <div className="p-4">
          <DarkModeButton />
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
