import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutTemplate, Home, Image, Type, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

const ContentDashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutTemplate,
      label: "Content Overview",
      path: "/dashboard/content",
    },
    // Future expansion:
    // { icon: Home, label: 'Hero Section', path: '/dashboard/content/hero' },
    // { icon: Image, label: 'Media Library', path: '/dashboard/content/media' },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white pt-20">
      <aside className="w-64 fixed left-0 top-20 bottom-0 bg-zinc-900 border-r border-white/5 p-6 z-40">
        <div className="mb-8 px-2">
          <h2 className="text-xl font-bold text-blue-400">Content CMS</h2>
          <p className="text-xs text-gray-500">Manage Website Content</p>
        </div>

        <div className="space-y-2 mb-8">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              active={location.pathname === item.path}
            />
          ))}
        </div>

        <div className="pt-8 border-t border-white/5">
          <Link
            to="/dashboard/admin"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Academy</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 bg-black min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default ContentDashboardLayout;
