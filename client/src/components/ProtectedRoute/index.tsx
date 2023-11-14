import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ADMIN_ROLE, ROLES_KEY } from "../../constants/auth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const roles = localStorage.getItem(ROLES_KEY);

  if (!roles?.split(",").includes(ADMIN_ROLE)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
