import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import Spinner from "../components/Spinner";
import Layout from "./Layout";

const routesByRole = {
  Admin: [
    {
      path: "/dashboard",
      element: React.lazy(() => import("./dashboards/AdminDashboard")),
    },
    {
      path: "/users",
      element: React.lazy(() => import("./Users")),
    },
    {
      path: "/notifications",
      element: React.lazy(() => import("./Notifications")),
    },
    {
      path: "/logout",
      element: React.lazy(() => import("../components/Logout")),
    },
    {
      path: "/evaluations",
      element: React.lazy(() => import("./Evaluations")),
    },
    {
      path: "/programs",
      element: React.lazy(() => import("./Programs")),
    },
    {
      path: "/profile",
      element: React.lazy(() => import("./Profile")),
    },
  ],

  Trainer: [
    {
      path: "/dashboard",
      element: React.lazy(() => import("./dashboards/TrainerDashboard")),
    },
    {
      path: "/training-programs",
      element: React.lazy(() => import("./trainer/TrainingProgram")),
    },
    {
      path: "/logout",
      element: React.lazy(() => import("../components/Logout")),
    },
  ],
  client: [
    {
      path: "/dashboard",
      element: React.lazy(() => import("./dashboards/CompanyDashboard")),
    },
    {
      path: "/programs",
      element: React.lazy(() => import("./client/Programs")),
    },
    {
      path: "/logout",
      element: React.lazy(() => import("../components/Logout")),
    },
  ],
};

const ProtectedRoutes = () => {
  const token = window.localStorage.getItem("token");
  const [decodedToken, setDecodedToken] = useState(null);
  const [Role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        setDecodedToken(jwtDecode(token));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken) {
      try {
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [decodedToken, setRole]);

  if (!Role)
    return <Route path="*" element={<Spinner size="6" color="blue-500" />} />;

  const roleRoutes = routesByRole[Role] || [];

  return (
    <Route element={<Layout />}>
      {roleRoutes.map(({ path, element: Element }, index) => (
        <Route key={index} path={path} element={<Element />} />
      ))}
      <Route path="*" element={<Navigate to="/NotFound" />} />
    </Route>
  );
};

export default ProtectedRoutes;
