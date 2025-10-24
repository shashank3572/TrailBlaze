import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold mb-4">🔥 TrailBlaze</h1>

        <Routes>
          {/* Define routes for your pages */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

