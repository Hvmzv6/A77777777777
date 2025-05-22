import React from "react";
import AdminDashboard from "./AdminDashboard";
import CompanyDashboard from "./CompanyDashboard";
import TrainerDashboard from "./TrainerDashboard";

const Dashboard = () => {
  const userRole = window.localStorage.getItem("userRole");

  const renderContent = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "trainer":
        return <TrainerDashboard />;
      case "client":
        return <CompanyDashboard />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Dashboard;
