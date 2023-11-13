import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { PASSWORD, PASSWORD_VALUE } from "../../constants/auth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const password = localStorage.getItem(PASSWORD);

  if (password !== PASSWORD_VALUE) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
