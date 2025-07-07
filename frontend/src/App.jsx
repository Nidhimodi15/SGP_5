import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import WorkSpace from "./pages/WorkSpace";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthWrapper from "./components/AuthWrapper";
import "./App.css";

import { useEffect, useState } from "react";
import CodeAndPromptArea from "./components/codeAndPromptArea";

function AppLayout() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/workspace" ||
    location.pathname === "/codeandpromptarea";

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected Route with AuthWrapper */}
        <Route
          path="/workspace"
          element={
            <AuthWrapper>
              <WorkSpace />
            </AuthWrapper>
          }
        />
        <Route
          path="/codeandpromptarea"
          element={
            // <AuthWrapper>
            <CodeAndPromptArea />
            /* </AuthWrapper> */
          }
        />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
