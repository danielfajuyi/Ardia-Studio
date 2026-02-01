import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Users as UsersIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
      active
        ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role || "student";

  const menuItems =
    role === "admin"
      ? [
          {
            icon: LayoutDashboard,
            label: "Overview",
            path: "/dashboard/admin",
          },
          {
            icon: BookOpen,
            label: "Upload Video",
            path: "/dashboard/admin/upload",
          },
          {
            icon: UsersIcon,
            label: "Students",
            path: "/dashboard/admin/students",
          },
          {
            icon: Settings,
            label: "Site Content (CMS)",
            path: "/dashboard/content",
          },
        ]
      : [
          {
            icon: LayoutDashboard,
            label: "My Learning",
            path: "/dashboard/student",
          },
          { icon: BookOpen, label: "Browse Courses", path: "/academy" },
        ];

  return (
    <div className="flex min-h-screen bg-black text-white pt-20">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-20 bottom-0 bg-black border-r border-white/10 p-6 z-40">
        <div className="flex items-center gap-3 px-4 mb-8">
          <img
            src={user?.picture}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold">{user?.name}</span>
            <span className="text-xs text-gray-400 capitalize">{role}</span>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              active={location.pathname === item.path}
            />
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-black">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
