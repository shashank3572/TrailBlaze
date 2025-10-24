import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add a request interceptor (for authentication tokens later)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // if a token is saved after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor (for handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
