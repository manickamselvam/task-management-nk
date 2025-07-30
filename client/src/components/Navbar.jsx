import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, UserPlus, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/signin" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MyApp</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === "/signin"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Link>

            <Link
              to="/register"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === "/register"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
