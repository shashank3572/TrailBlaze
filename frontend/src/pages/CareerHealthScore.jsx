import React, { useState } from "react";

const CareerHealthScore = () => {
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [industry, setIndustry] = useState("");
  const [score, setScore] = useState(null);

  // Simple AI Scoring Logic
  const calculateScore = () => {
    let base = 40; // everyone gets 40 (baseline)

    // Experience Impact
    if (experience >= 5) base += 20;
    else if (experience >= 2) base += 10;
    else base += 5;

    // Skills Impact
    let skillCount = skills.split(",").filter(Boolean).length;
    base += Math.min(skillCount * 5, 25); // max +25

    // Industry Stability (Dummy AI Logic)
    const stableIndustries = ["tech", "finance", "healthcare"];
    const riskyIndustries = ["arts", "real estate", "crypto"];

    if (stableIndustries.includes(industry.toLowerCase())) base += 10;
    if (riskyIndustries.includes(industry.toLowerCase())) base -= 10;

    // Final Score (0–100)
    base = Math.max(0, Math.min(base, 100));

    setScore(base);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-neutral-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Career Health Score
        </h1>

        <p className="text-gray-400 mb-8 text-center">
          Enter a few details to estimate your career stability using an AI-based score.
        </p>

        {/* FORM */}
        <div className="space-y-6">

          {/* Experience */}
          <div>
            <label className="block mb-2 font-semibold">Years of Experience</label>
            <input
              type="number"
              placeholder="Eg: 2"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-3 rounded bg-neutral-700 border border-neutral-600"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-2 font-semibold">Skills (comma separated)</label>
            <input
              type="text"
              placeholder="Eg: React, Python, SQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 rounded bg-neutral-700 border border-neutral-600"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block mb-2 font-semibold">Industry</label>
            <input
              type="text"
              placeholder="Eg: Tech, Finance, Healthcare"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-3 rounded bg-neutral-700 border border-neutral-600"
            />
          </div>

          {/* Button */}
          <button
            onClick={calculateScore}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          >
            Calculate Score
          </button>
        </div>

        {/* SHOW SCORE */}
        {score !== null && (
          <div className="mt-8 text-center">
            <h2 className="text-4xl font-bold text-green-400">{score} / 100</h2>
            <p className="text-gray-400 mt-3">
              Your current career health score based on experience, skills & industry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerHealthScore;
