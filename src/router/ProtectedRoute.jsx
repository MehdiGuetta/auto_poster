import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({isProtected}) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isProtected && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
