import React, { useEffect, useState } from "react";
import axios from "../api/client";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user.name} 👋</h2>
        <p className="text-gray-300 mb-2">Email: {user.email}</p>
        <p className="text-gray-400 text-sm mb-4">Joined: {user.createdAt?.slice(0, 10)}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded w-full font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
