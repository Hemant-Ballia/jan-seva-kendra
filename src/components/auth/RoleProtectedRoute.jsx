import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/authStorage";

const RoleProtectedRoute = ({ allowedRole, children }) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default RoleProtectedRoute;