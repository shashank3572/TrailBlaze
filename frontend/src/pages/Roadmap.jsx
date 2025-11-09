import React, { useState, useEffect } from "react";
import roadmapData from "../data/roadmapData";
import RoadmapFlow from "../components/RoadmapFlow";

export default function Roadmap() {
  const [selected, setSelected] = useState("Full Stack Developer");
  const [recommended, setRecommended] = useState(null);

  useEffect(() => {
    const rec = localStorage.getItem("recommendedCareer");
    if (rec) setRecommended(rec);
  }, []);

  const careers = Object.keys(roadmapData);
  const current = roadmapData[selected];

  return (
    <div className="text-white min-h-screen p-8 bg-neutral-950">
      <h1 className="text-3xl font-bold mb-6">Career Roadmaps</h1>

      {/* Recommended Badge */}
      {recommended && (
        <p className="mb-4 text-green-400 text-lg">
          ✅ Based on your Affinity Quiz, we recommend:  
          <span className="font-bold">{recommended}</span>
        </p>
      )}

      {/* Selector Buttons */}
      <div className="mb-6 flex gap-4 flex-wrap">
        {careers.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`px-4 py-2 rounded-lg ${
              selected === c
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-gray-400 mb-8 max-w-3xl">
        {current.description}
      </p>

      <RoadmapFlow
        sections={current.sections}
        highlight={recommended && recommended.includes(selected)}
      />
    </div>
  );
}
