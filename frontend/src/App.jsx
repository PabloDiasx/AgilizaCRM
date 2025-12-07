import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Support from './pages/Support';
import Marketing from './pages/Marketing';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const RoleRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  let user = null;

  try {
    user = JSON.parse(userStr);
  } catch (e) {
    console.error("Invalid user data");
  }

  if (!token || !user) return <Navigate to="/login" />;

  // Strict matching
  if (user.role !== allowedRole) {
    console.warn(`Role Mismatch! User: ${user.role}, Allowed: ${allowedRole}`);

    // Smart Redirect
    if (user.role === 'Admin') {
      return <Navigate to="/dashboard-admin" />;
    } else if (user.role === 'Vendedor') {
      return <Navigate to="/vendas-vendedor" />;
    } else {
      // Unknown role? Back to login.
      return <Navigate to="/login" />;
    }
  }
  return children;
};

import SalespersonDashboard from './pages/SalespersonDashboard';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard-admin" element={
            <RoleRoute allowedRole="Admin">
              <Dashboard />
            </RoleRoute>
          } />

          <Route path="/vendas-vendedor" element={
            <RoleRoute allowedRole="Vendedor">
              <SalespersonDashboard />
            </RoleRoute>
          } />

          {/* Admin Routes */}
          <Route path="/vendas" element={
            <RoleRoute allowedRole="Admin">
              <Sales />
            </RoleRoute>
          } />
          <Route path="/atendimento" element={
            <RoleRoute allowedRole="Admin">
              <Support />
            </RoleRoute>
          } />
          <Route path="/marketing" element={
            <RoleRoute allowedRole="Admin">
              <Marketing />
            </RoleRoute>
          } />
          <Route path="/relatorios" element={
            <RoleRoute allowedRole="Admin">
              <Reports />
            </RoleRoute>
          } />
          <Route path="/config" element={
            <PrivateRoute> {/* Both can access config, maybe differ inside? */}
              <Settings />
            </PrivateRoute>
          } />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
