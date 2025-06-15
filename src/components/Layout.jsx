import React, { useState } from "react";
import { Menu, Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar.jsx";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-3 py-2 sm:px-4 sm:py-3 md:px-6">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <Link
            to="/dashboard"
            className="flex items-center space-x-1.5 sm:space-x-2"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">
              BTMETA
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleMenu}
          />
        )}

        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
