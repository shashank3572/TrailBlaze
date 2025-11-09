import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-neutral-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Left side logo */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        TrailBlaze
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400 transition">
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="hover:text-blue-400 transition">
              Dashboard
            </Link>

            <Link to="/roadmap" className="hover:text-blue-400 transition">
              Roadmap
            </Link>

            <Link to="/trends" className="hover:text-blue-400 transition">
              Trends
            </Link>

            <Link to="/profile" className="hover:text-blue-400 transition">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
