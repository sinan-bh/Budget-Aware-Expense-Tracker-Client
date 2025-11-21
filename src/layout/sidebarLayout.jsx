import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  PieChart,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";
import useAddExpenseModalStore from "../hooks/store/addExpenseModalStore";

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openModal } = useAddExpenseModalStore();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  const handlelogout = async () => {
    navigate("/auth");
  };

  // eslint-disable-next-line no-unused-vars
  const menuItem = (to, label, Icon) => (
    <Link
      to={to}
      className={`flex items-center gap-3 p-2 rounded-md mb-2 ${
        pathname === to
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );

  return (
    <div className="flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md fixed h-screen hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            Budget Tracker
          </h1>
        </div>

        <nav className="grow p-4">
          {menuItem("/dashboard", "Dashboard", LayoutDashboard)}
          {menuItem("/reports", "Reports", PieChart)}
          <button
            onClick={openModal}
            className={`flex items-center gap-3 p-2 rounded-md mb-2 text-gray-700 hover:bg-gray-200`}
          >
            <PlusCircle size={18} />
            Add Expense
          </button>
          {menuItem("/settings", "Settings", Settings)}

          <button
            onClick={handlelogout}
            className="flex items-center gap-3 p-2 w-full text-left text-gray-700 hover:bg-gray-200 rounded-md mt-4"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-0 md:ml-64 bg-gray-200 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
