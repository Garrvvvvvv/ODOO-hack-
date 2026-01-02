import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
