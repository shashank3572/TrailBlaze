import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-neutral-950 text-gray-100">
      <h1 className="text-5xl font-bold mb-4">Welcome to TrailBlaze</h1>
      <p className="max-w-xl text-lg text-gray-400 mb-8">
        Discover your ideal career path using AI-powered insights. 
        Plan, track, and grow your professional journey with confidence.
      </p>
      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white text-lg transition-all"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
