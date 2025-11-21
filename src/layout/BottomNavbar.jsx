import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PieChart, Settings, PlusCircle } from "lucide-react";
import useAddExpenseModalStore from "../hooks/store/addExpenseModalStore";

const BottomNavbar = () => {
  const { pathname } = useLocation();
  const { openModal } = useAddExpenseModalStore();

  const navItem = (to, label, Icon) => (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center p-2 text-xs font-medium ${
        pathname === to ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
      }`}
    >
      <Icon size={20} className="mb-1" />
      {label}
    </Link>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t md:hidden z-50">
      <div className="flex justify-around h-16">
        {navItem("/dashboard", "Dashboard", LayoutDashboard)}
        <button
          onClick={openModal}
          className={`flex flex-col items-center justify-center p-2 text-xs font-medium text-gray-500 hover:text-blue-600`}
        >
          <PlusCircle size={20} className="mb-1" />
          Add Expense
        </button>
        {navItem("/reports", "Reports", PieChart)}
        {navItem("/settings", "Settings", Settings)}
      </div>
    </nav>
  );
};

export default BottomNavbar;
