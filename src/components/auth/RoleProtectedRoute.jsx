import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const RoleProtectedRoute = ({ allowedRole, children }) => {
  const { user, loading } = useAuth();

  // Wait for the session bootstrap to finish before deciding.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-800" />
          <p className="text-sm font-bold text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
