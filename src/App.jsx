import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "../src/global.css";
import { AuthProvider } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ComponentEditPage from './pages/ComponentsEditPage'; 

import { initializeMockData } from './utils/localStorageUtils';

import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

import ShipsPage from './pages/ShipsPage';
import ShipForm from './components/Ships/ShipForm';
import ShipDetailPage from './pages/ShipDetailPage';

import ComponentsPage from './pages/ComponentsPage';

import JobsPage from './pages/JobsPage';
import JobForm from './components/Jobs/JobForm';
import JobCalendar from './components/Jobs/JobCalendar';
import AddComponent from "./pages/AddComponent";



const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />

      
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />

      
      <Route path="/ships" element={<PrivateRoute><ShipsPage /></PrivateRoute>} />
      <Route path="/ships/new" element={<PrivateRoute><ShipForm /></PrivateRoute>} />
      <Route path="/ships/edit/:id" element={<PrivateRoute><ShipForm /></PrivateRoute>} />
      <Route path="/ship/:id" element={<PrivateRoute><ShipDetailPage /></PrivateRoute>} />

      
      <Route path="/components" element={<PrivateRoute><ComponentsPage /></PrivateRoute>} />

      
      <Route path="/jobs" element={<PrivateRoute><JobsPage /></PrivateRoute>} />
      <Route path="/jobs/new" element={<PrivateRoute><JobForm /></PrivateRoute>} />
      <Route path="/jobs/edit/:id" element={<PrivateRoute><JobForm /></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><JobCalendar /></PrivateRoute>} />
      <Route path="/components/edit/:id" element={<ComponentEditPage />} />
      <Route path="/components/new" element={<AddComponent />} />
      
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

const App = () => {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider> {/* ✅ NotificationCenter will be rendered from here */}
        <ShipsProvider>
          <ComponentsProvider>
            <JobsProvider>
              <AppRoutes />
            </JobsProvider>
          </ComponentsProvider>
        </ShipsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
