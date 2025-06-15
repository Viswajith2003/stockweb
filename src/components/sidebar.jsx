import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Menu,
  Home,
  Wallet,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar({ isMenuOpen, toggleMenu }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getLinkClasses = (path) => {
    const baseClasses =
      "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors w-full";
    const activeClasses = "bg-blue-50 text-blue-700 border-r-4 border-blue-500";
    const inactiveClasses =
      "text-gray-700 hover:bg-gray-100 hover:text-blue-600";
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const handleLinkClick = () => {
    if (isMenuOpen && window.innerWidth < 768) toggleMenu();
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
            <Link
              to="/dashboard"
              className={getLinkClasses("/dashboard")}
              onClick={handleLinkClick}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/wallet"
              className={getLinkClasses("/wallet")}
              onClick={handleLinkClick}
            >
              <Wallet className="w-5 h-5" />
              <span>Wallet</span>
            </Link>
          </li>
          <li>
            <Link
              to="/transaction"
              className={getLinkClasses("/transaction")}
              onClick={handleLinkClick}
            >
              <CreditCard className="w-5 h-5" />
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className={getLinkClasses("/analytics")}
              onClick={handleLinkClick}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={getLinkClasses("/settings")}
              onClick={handleLinkClick}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
