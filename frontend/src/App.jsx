import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import WorkSpace from './pages/WorkSpace';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

import { useEffect, useState } from 'react';

// Layout wrapper to control Header/Footer visibility
function AppLayout() {
  const location = useLocation();

  // Hide header/footer only on `/workspace`
  const hideHeaderFooter = location.pathname === '/workspace';

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspace" element={<WorkSpace />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

// Main App with BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
