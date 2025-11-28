import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Trends from "./pages/Trends";
import Profile from "./pages/Profile";
import CareerHealthScore from "./pages/CareerHealthScore";
import CareerAffinityQuiz from "./pages/CareerAffinityQuiz";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/health" 
        element={<ProtectedRoute><CareerHealthScore /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><CareerAffinityQuiz /></ProtectedRoute>} />



        <Route
        path="/roadmap/:careerId"
         element={
        <ProtectedRoute>
           <Roadmap />
         </ProtectedRoute>
         }
/>


        <Route
          path="/trends"
          element={
            <ProtectedRoute>
              <Trends />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
