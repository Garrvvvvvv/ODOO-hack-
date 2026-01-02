import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function RoleRoute({ role, children }) {
  const { user } = useAuth();

  if (user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}
