// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white px-6">
      {/* Logo or App Name */}
      <h1 className="text-5xl font-extrabold mb-4"> TrailBlaze</h1>

      {/* Tagline */}
      <p className="text-lg mb-8 text-center max-w-xl">
        Discover, plan, and grow your ideal career path with AI-powered
        insights, personalized roadmaps, and real-world learning resources.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
        >
          Login
        </Link>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm opacity-70">
        © {new Date().getFullYear()} TrailBlaze. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;

