import React, { useEffect, useState } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";
import { recommendCareer } from "../utils/recommender";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data ONLY
  useEffect(() => {
    async function fetchData() {
      try {
        const profileRes = await api.get("/user/profile");
        setUser(profileRes.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-400">
        Loading Dashboard...
      </div>
    );

  // ✅ AI Recommendation (simple + robust)
  const aiCareer = recommendCareer(user?.skills || []);

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 p-8">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-blue-400">{user?.name}</span> 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Explore your personalized roadmap, insights, and career tools.
        </p>
      </div>

      {/* ✅ AI Recommendation Card */}
      <div className="max-w-4xl mx-auto bg-neutral-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-2">
          AI-Predicted Career Path
        </h2>

        {!aiCareer ? (
          <p className="text-gray-400">
            Add skills in your profile to get AI-based predictions.
          </p>
        ) : (
          <p className="text-green-400 text-2xl font-bold mt-2">
            {aiCareer}
          </p>
        )}
      </div>

      {/* GRID SECTIONS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 – Roadmap */}
        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">Career Roadmap</h2>
          <p className="text-gray-400 mb-4">
            View step-by-step learning paths tailored for careers.
          </p>
          <Link
            to="/roadmap"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg inline-block"
          >
            Open Roadmap →
          </Link>
        </div>

        {/* Card 2 – Trends */}
        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">Trends & News</h2>
          <p className="text-gray-400 mb-4">
            Stay updated with tech & career market insights.
          </p>
          <Link
            to="/trends"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg inline-block"
          >
            View Trends →
          </Link>
        </div>

        {/* Card 3 – Career Health Score */}
        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">Career Health Score</h2>
          <p className="text-gray-400 mb-4">
            Analyze growth, stability, and long-term potential.
          </p>
          <Link
            to="/health"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg inline-block"
          >
            Check Score →
          </Link>
        </div>

        {/* Card 4 – Career Affinity Quiz */}
        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">Career Affinity Quiz</h2>
          <p className="text-gray-400 mb-4">
            Not sure what suits you? Take a quick quiz.
          </p>
          <Link
            to="/quiz"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg inline-block"
          >
            Take Quiz →
          </Link>
        </div>

        {/* Card 5 – Profile */}
        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">Your Profile</h2>
          <p className="text-gray-400 mb-4">
            Update skills & personal info.
          </p>
          <Link
            to="/profile"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg inline-block"
          >
            Go to Profile →
          </Link>
        </div>
      </div>

      {/* ✅ CONTACT SECTION */}
      <div className="max-w-5xl mx-auto mt-16 border-t border-gray-800 pt-10">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Contact Us
        </h2>

        <p className="text-gray-400 max-w-2xl mb-6">
          Have questions or need help with your career roadmap?
          Reach out anytime — we’re always here to assist.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-blue-400 transition-all">
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-400">shashank3572@gmail.com</p>
          </div>

          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-blue-400 transition-all">
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-400">+91 83106 22817</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm text-center mt-10">
          © {new Date().getFullYear()} TrailBlaze — All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
