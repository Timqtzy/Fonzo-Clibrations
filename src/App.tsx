import './App.css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthChecker } from './hooks/useAuthChecker'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import JobOrders from './pages/jobOrders'
import WorkAssign from './pages/workAssign'
import InventorySupplies from './pages/inventorySupplies'
import Suppliers from './pages/suppliers'
import Mechanics from './pages/mechanics'
import AppointmentScheduling from './pages/appointmentScheduling'
import Customers from './pages/customers'
import UserManagement from './pages/userManagement'
import Settings from './pages/settings'
import Layout from './components/app/layout'

function PrivateRoute({ children }: { children: React.JSX.Element }) {
  const { isLoading, isAuthenticated } = useAuthChecker();

  if (isLoading) return <p>Loading...</p>;
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.JSX.Element }) {
  const { isLoading, isAuthenticated } = useAuthChecker();

  if (isLoading) return <p>Loading...</p>;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/job-orders"
        element={
          <PrivateRoute>
            <JobOrders />
          </PrivateRoute>
        }
      />
           <Route
        path="/work-assign"
        element={
          <PrivateRoute>
            <WorkAssign />
          </PrivateRoute>
        }
      />
           <Route
        path="/inventory-supplies"
        element={
          <PrivateRoute>
            <InventorySupplies />
          </PrivateRoute>
        }
      />
           <Route
        path="/suppliers"
        element={
          <PrivateRoute>
            <Suppliers />
          </PrivateRoute>
        }
      />
           <Route
        path="/mechanics"
        element={
          <PrivateRoute>
            <Mechanics />
          </PrivateRoute>
        }
      />
           <Route
        path="/appointment-scheduling"
        element={
          <PrivateRoute>
            <AppointmentScheduling />
          </PrivateRoute>
        }
      />
           <Route
        path="/customers"
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        }
      />
           <Route
        path="/user-management"
        element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
