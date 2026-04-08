import React from "react";
import { Navigate } from "react-router";
import { ROUTES } from "../consts";

const GuestRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

export default GuestRoute;
