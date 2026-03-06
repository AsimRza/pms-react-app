import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
