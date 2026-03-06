import React from "react";
import { NavLink, useNavigate } from "react-router";
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  Users,
  LogOut,
} from "lucide-react";
import { ROUTES } from "../../shared/consts";

const Sidebar = () => {
  const navigate = useNavigate();

  // Placeholder user data
  const user = { firstName: "John", lastName: "Doe" };

  const handleLogout = () => {
    // Handle logout logic here, e.g., clear tokens
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { to: "/dashboard/grading", label: "Qiymətləndirmə", icon: GraduationCap },
    { to: "/dashboard/lessons", label: "Dərslər", icon: BookOpen },
    { to: "/dashboard", label: "Statistika", icon: BarChart3 },
    { to: "/dashboard/students", label: "Tələbələr", icon: Users },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">PMS App</h2>
      </div>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div>
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-400">Müəllim</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Çıxış</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
