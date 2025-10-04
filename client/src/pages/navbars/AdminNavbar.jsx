import {
  BarChart2,
  Folder,
  LogOut,
  Megaphone,
  Menu,
  MessageCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Analytics",
      icon: <BarChart2 size={18} />,
      path: "/admin/analytics",
    },
    {
      name: "Announcement Panel",
      icon: <Megaphone size={18} />,
      path: "/admin/announcements",
    },
    {
      name: "LikHow Discussions",
      icon: <MessageCircle size={18} />,
      path: "/admin/forum",
    },
    {
      name: "Uploaded Projects",
      icon: <Folder size={18} />,
      path: "/admin/projects",
    },
    { name: "User Accounts", icon: <Users size={18} />, path: "/admin/users" },
    { name: "Log out", icon: <LogOut size={18} />, path: "#logout" },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* SIDEBAR */}
        <aside
          className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            {!collapsed && (
              <span className="font-bold text-lg">LikhaCampus</span>
            )}
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu size={20} />
            </button>
          </div>

          <nav className="flex-1 px-2 mt-4 flex flex-col gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition-colors ${
                    collapsed ? "justify-center" : ""
                  } ${isActive ? "bg-gray-200" : ""}`
                }
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col">
          {/* TOPBAR */}
          <header className="flex items-center justify-between bg-white border-b border-gray-200 h-16 px-4 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                className="btn btn-ghost btn-sm lg:hidden"
                onClick={() => setCollapsed(!collapsed)}
              >
                <Menu size={20} />
              </button>
              <span className="font-bold text-lg">Admin Dashboard</span>
            </div>
          </header>

          {/* CONTENT AREA */}
          <main className="flex-1 p-5 overflow-y-auto bg-base-100">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
