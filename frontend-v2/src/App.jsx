import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layout/AppLayout";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Roadmap from "./pages/Roadmap";
import Tasks from "./pages/Tasks"; // ← HERE

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/careers" element={<div>Careers Page</div>} />

          <Route path="/roadmap/:career" element={<Roadmap />} />

          {/* ✔ FIXED */}
          <Route path="/tasks" element={<Tasks />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
