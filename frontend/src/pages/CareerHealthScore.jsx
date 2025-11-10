import React, { useState } from "react";

export default function CareerHealthScore() {
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [industry, setIndustry] = useState("");
  const [score, setScore] = useState(null);
  const [level, setLevel] = useState("");

  const stableIndustries = ["tech", "finance", "healthcare", "it"];
  const growingSkills = ["react", "python", "sql", "java", "ml", "ai", "cloud", "node"];

  const calculateScore = () => {
    let base = 40; // baseline

    // ✅ Experience weighting
    if (experience >= 5) base += 25;
    else if (experience >= 2) base += 15;
    else base += 8;

    // ✅ Skills score
    const skillList = skills
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    let goodSkills = skillList.filter((s) => growingSkills.includes(s)).length;
    base += Math.min(goodSkills * 7, 30); // upto +30

    // ✅ Industry Score
    const ind = industry.trim().toLowerCase();
    if (stableIndustries.includes(ind)) base += 15;
    else base -= 5;

    // ✅ Final clamp (0-100)
    const final = Math.max(0, Math.min(base, 100));
    setScore(final);

    // ✅ Determine level
    if (final >= 85) setLevel("Excellent");
    else if (final >= 70) setLevel("Good");
    else if (final >= 50) setLevel("Average");
    else setLevel("Needs Improvement");
  };

  const getColor = () => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-blue-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-neutral-900 p-10 rounded-xl shadow-xl border border-neutral-800">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Career Health Score (AI-Based)
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Evaluate your career stability using skills, experience, and industry trends.
        </p>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Years of Experience</label>
            <input
              type="number"
              placeholder="Eg: 2"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Skills (comma separated)
            </label>
            <input
              type="text"
              placeholder="Eg: React, Python, SQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Industry</label>
            <input
              type="text"
              placeholder="Eg: Tech, Finance, Healthcare"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
            />
          </div>

          <button
            onClick={calculateScore}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          >
            Calculate Score
          </button>
        </div>

        {/* SCORE RESULT */}
        {score !== null && (
          <div className="mt-10 text-center">
            {/* Circular Score */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#2d2d2d"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke={score >= 85 ? "#22c55e" : score >= 70 ? "#3b82f6" : score >= 50 ? "#facc15" : "#ef4444"}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${score * 4.4} 440`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`${getColor()} text-3xl font-bold`}>
                  {score}
                </span>
              </div>
            </div>

            <h2 className={`text-xl font-bold mb-1 ${getColor()}`}>
              {level} Career Health
            </h2>

            <p className="text-gray-400 mb-6">
              This score reflects your stability in today’s job market.
            </p>

            {/* Recommendations */}
            <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 text-left">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">
                Personalized Recommendations
              </h3>

              <ul className="text-gray-300 space-y-2 list-disc ml-6">
                {score >= 85 && (
                  <>
                    <li>You are well-aligned with current industry needs.</li>
                    <li>Focus on specialization (AI, Cloud, DevOps).</li>
                  </>
                )}
                {score >= 70 && score < 85 && (
                  <>
                    <li>Your profile is strong — improve by adding 1–2 trending skills.</li>
                    <li>Start building real-world projects.</li>
                  </>
                )}
                {score >= 50 && score < 70 && (
                  <>
                    <li>Try strengthening your foundation skills.</li>
                    <li>Consider upskilling with online courses.</li>
                  </>
                )}
                {score < 50 && (
                  <>
                    <li>Your career may be at risk — improve skills immediately.</li>
                    <li>Switch to a more stable industry or learn in-demand skills.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
