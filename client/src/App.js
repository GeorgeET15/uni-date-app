import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Creator from "./pages/Creator";

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
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/cookiepolicy" element={<CookiePolicy />} />
        <Route path="/creator" element={<Creator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
