import React from "react";
import {
  Home,
  Wallet,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
  // Get current location/route
  const location = useLocation();

  // Function to check if current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to get dynamic classes based on active state
  const getLinkClasses = (path) => {
    const baseClasses =
      "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors";
    const activeClasses = "bg-blue-50 text-blue-700";
    const inactiveClasses = "text-gray-700 hover:bg-gray-100";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside
      className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
       md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
       transition-transform duration-300 ease-in-out md:shadow-none md:border-r border-gray-200`}
    >
      <div className="p-4 border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={toggleMenu}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className={getLinkClasses("/dashboard")}>
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/wallet" className={getLinkClasses("/wallet")}>
              <Wallet className="w-5 h-5" />
              <span>Wallet</span>
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className={getLinkClasses("/transactions")}
            >
              <CreditCard className="w-5 h-5" />
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link to="/analytics" className={getLinkClasses("/analytics")}>
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className={getLinkClasses("/settings")}>
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

// Alternative shorter version using inline logic
const SidebarAlternative = ({ isMenuOpen, toggleMenu }) => {
  const location = useLocation();

  return (
    <aside
      className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
       md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
       transition-transform duration-300 ease-in-out md:shadow-none md:border-r border-gray-200`}
    >
      <div className="p-4 border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={toggleMenu}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === "/dashboard"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/wallet"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === "/wallet"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span>Wallet</span>
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === "/transactions"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === "/analytics"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === "/settings"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
