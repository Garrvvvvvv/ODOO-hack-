import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import AdminDashboard from "./admin/Dashboard";
import LeaveApprovals from "./admin/LeaveApprovals";
import EmployeeDashboard from "./employee/Dashboard";
import EmployeeLeave from "./employee/Leave";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Employee */}
      <Route
        path="/employee"
        element={
          <PrivateRoute>
            <RoleRoute role="EMPLOYEE">
              <EmployeeLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
        <Route path="leave" element={<EmployeeLeave />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <RoleRoute role="ADMIN">
              <AdminLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="leaves" element={<LeaveApprovals />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
