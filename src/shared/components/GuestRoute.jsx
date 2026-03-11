import React from "react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "../consts";

const GuestRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

export default GuestRoute;
