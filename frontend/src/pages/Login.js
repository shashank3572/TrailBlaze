import React, { useState } from "react";
import axios from "../api/client";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); // save token
      navigate("/profile"); // redirect to profile
    } catch (err) {
      setError(err.response?.data?.message || "Login failed 😞");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-800 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-600 bg-gray-700 p-2 w-full mb-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 bg-gray-700 p-2 w-full mb-3 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 w-full rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-400 mt-3">{error}</p>}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
