import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4">
        <div className="border w-full h-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
