import './App.css'
import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthChecker } from './hooks/useAuthChecker'
import type { UserRole } from './types/roles'
import { roleAccess } from './types/roles'
import Layout from './components/app/layout'

// Lazy load pages for code splitting
const Landing = lazy(() => import('./pages/landing'))
const Login = lazy(() => import('./pages/login'))
const ResetPassword = lazy(() => import('./pages/reset-password'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const JobOrders = lazy(() => import('./pages/jobOrders'))
const WorkAssign = lazy(() => import('./pages/workAssign'))
const InventorySupplies = lazy(() => import('./pages/inventorySupplies'))
const Suppliers = lazy(() => import('./pages/suppliers'))
const Mechanics = lazy(() => import('./pages/mechanics'))
const AppointmentScheduling = lazy(() => import('./pages/appointmentScheduling'))
const Customers = lazy(() => import('./pages/customers'))
const UserManagement = lazy(() => import('./pages/userManagement'))
const ActivityLogs = lazy(() => import('./pages/activityLogs'))
const Settings = lazy(() => import('./pages/settings'))
const Unauthorized = lazy(() => import('./pages/unauthorized'))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg text-gray-600">Loading...</div>
  </div>
)

function PrivateRoute({ children, allowedRoles }: { children: React.JSX.Element; allowedRoles?: UserRole[] }) {
  const { isLoading, isAuthenticated, userRole } = useAuthChecker();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  // If specific roles are required, check if user has permission
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Layout>{children}</Layout>;
}

function PublicRoute({ children }: { children: React.JSX.Element }) {
  const { isLoading, isAuthenticated } = useAuthChecker();

  if (isLoading) return <p>Loading...</p>;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={roleAccess['/dashboard']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/job-orders"
          element={
            <PrivateRoute allowedRoles={roleAccess['/job-orders']}>
              <JobOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/work-assign"
          element={
            <PrivateRoute allowedRoles={roleAccess['/work-assign']}>
              <WorkAssign />
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory-supplies"
          element={
            <PrivateRoute allowedRoles={roleAccess['/inventory-supplies']}>
              <InventorySupplies />
            </PrivateRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <PrivateRoute allowedRoles={roleAccess['/suppliers']}>
              <Suppliers />
            </PrivateRoute>
          }
        />
        <Route
          path="/mechanics"
          element={
            <PrivateRoute allowedRoles={roleAccess['/mechanics']}>
              <Mechanics />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment-scheduling"
          element={
            <PrivateRoute allowedRoles={roleAccess['/appointment-scheduling']}>
              <AppointmentScheduling />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute allowedRoles={roleAccess['/customers']}>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <PrivateRoute allowedRoles={roleAccess['/user-management']}>
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/activity-logs"
          element={
            <PrivateRoute allowedRoles={roleAccess['/activity-logs']}>
              <ActivityLogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute allowedRoles={roleAccess['/settings']}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <PrivateRoute>
              <Unauthorized />
            </PrivateRoute>
          }
        />
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
