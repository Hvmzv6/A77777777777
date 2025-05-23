import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ToastProvider from "./components/ToastProvider";
import "./index.css";
import Dashboard from "./pages/dashboards/Dashboard";
import Evaluations from "./pages/Evaluations";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Participants from "./pages/Participants";
import Profile from "./pages/Profile";
import Programs from "./pages/Programs";
import Theme from "./pages/Theme";
import Users from "./pages/Users";

import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider />
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/theme" element={<Theme />} />
              <Route path="/users" element={<Users />} />

              {["/programs", "/trainer-programs", "/client-programs"].map(
                (path) => (
                  <Route key={path} path={path} element={<Programs />} />
                )
              )}
              <Route path="/evaluations" element={<Evaluations />} />

              {[
                "/notifications",
                "/trainer-notifications",
                "/client-notifications",
              ].map((path) => (
                <Route key={path} path={path} element={<Notifications />} />
              ))}

              <Route path="/participants" element={<Participants />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
