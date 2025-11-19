import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role !== "USER") return <Navigate to="/" replace />; // redirect non-users

  return <Outlet />; // renders nested user routes
};

export default ProtectedUserRoute;
