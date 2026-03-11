import React from "react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "../consts";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
