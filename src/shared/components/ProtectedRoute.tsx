import React from "react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "../consts";

interface IProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
