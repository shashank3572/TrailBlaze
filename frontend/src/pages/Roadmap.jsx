import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";

export default function Roadmap() {
  const { careerId } = useParams();

  // 🔵 LOG #1 — Check if careerId comes from URL
  console.log("Career ID from URL:", careerId);

  const [loading, setLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState(null);

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const res = await api.get(`/ai/roadmap/${careerId}`);

        // 🔵 LOG #2 — See what backend returns
        console.log("Roadmap API response:", res.data);

        setRoadmapData(res.data);
      } catch (err) {
        console.error("Roadmap fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, [careerId]);

  if (loading)
    return (
      <div className="text-white p-6">
        ⚙️ Generating Your Personalized Roadmap...
      </div>
    );

  if (!roadmapData)
    return (
      <div className="text-white p-6">
        ❌ Roadmap not available.
      </div>
    );

  return (
    <div className="p-6 text-white min-h-screen bg-neutral-900">
      <h1 className="text-3xl font-bold text-blue-400">
        {roadmapData.career} Roadmap
      </h1>

      <p className="text-gray-400 mt-1">
        Customized based on your skills and experience 🚀
      </p>

      <div className="mt-6 space-y-6">
        {roadmapData.roadmap.map((phase, index) => (
          <div key={index} className="bg-neutral-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">
              {phase.title || `Phase ${phase.phase}`}
            </h2>

            {phase.steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border mt-2 ${
                  step.status === "completed"
                    ? "border-green-400 bg-green-900/20"
                    : step.status === "in-progress"
                    ? "border-yellow-400 bg-yellow-900/20"
                    : "border-red-400 bg-red-900/20"
                }`}
              >
                <p className="text-lg">{step.name}</p>
                <p className="text-xs text-gray-400 capitalize">
                  Status: {step.status}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
