import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Profile from "./pages/Profile";

const App = () => {
  const [cookies] = useCookies(["AuthToken"]);

  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        {/* If there is an authToken, redirect to Dashboard, else show Home */}
        {authToken ? (
          <Route path="/" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}

        {/* Protected routes */}
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
        {authToken && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
