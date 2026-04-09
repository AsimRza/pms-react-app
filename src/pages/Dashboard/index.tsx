import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4">
        <div className="border rounded-md border-gray-300 w-full h-full p-5 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
