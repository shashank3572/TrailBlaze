import React, { useEffect, useState } from "react";

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [news, setNews] = useState([]);
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    // ✅ MOCK DATA (Replace with backend later)
    setTrends([
      { name: "AI / Machine Learning Engineer", growth: "+38% YoY", demand: "Very High" },
      { name: "Data Analyst", growth: "+26% YoY", demand: "High" },
      { name: "Cybersecurity Engineer", growth: "+32% YoY", demand: "High" },
      { name: "Full-Stack Developer", growth: "+18% YoY", demand: "Medium" },
    ]);

    setNews([
      {
        title: "AI Startups Receive Record Funding in 2025",
        link: "https://m.economictimes.com/tech/artificial-intelligence/ai-startups-captured-over-50-of-venture-funding-in-2025-report/articleshow/124734929.cms"},
      {
        title: "Top Companies Hiring Data Engineers Right Now",
        link: "https://www.glassdoor.co.in/Explore/top-data-engineer-companies_IO.4,17.html",
      },
      {
        title: "Cybersecurity Roles Increase After Global Attacks",
        link: "https://www.weforum.org/stories/2025/06/cybersecurity-jobs-rise-us-industries-navigate-economic-uncertainty/",
      },
    ]);

    setRisks([
      { role: "Manual Data Entry Jobs", reason: "Automated by AI", risk: "High Risk" },
      { role: "Basic Customer Support", reason: "Chatbots replacing tasks", risk: "Medium-High Risk" },
      { role: "Traditional Graphic Design", reason: "AI Design Tools", risk: "Medium Risk" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-400 mb-6">
          Career Trends & Insights
        </h1>

        {/* ✅ TOP CAREER TRENDS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">
            🔥 Trending Career Roles
          </h2>
          <div className="space-y-4">
            {trends.map((t, i) => (
              <div
                key={i}
                className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition"
              >
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Growth: <span className="text-green-400">{t.growth}</span>
                </p>
                <p className="text-gray-400">Demand: {t.demand}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ INDUSTRY NEWS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">
            📰 Latest News & Updates
          </h2>
          <div className="space-y-4">
            {news.map((n, i) => (
              <a
                key={i}
                href={n.link}
                target="_blank"
                rel="noreferrer"
                className="block p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition"
              >
                <p className="text-lg">{n.title}</p>
                <p className="text-blue-400 text-sm mt-1">Read more →</p>
              </a>
            ))}
          </div>
        </section>

        {/* ✅ RISK ALERTS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-400">
            ⚠️ Career Risk Alerts
          </h2>
          <div className="space-y-4">
            {risks.map((r, i) => (
              <div
                key={i}
                className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition"
              >
                <h3 className="text-xl font-semibold text-red-300">{r.role}</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Reason: {r.reason}
                </p>
                <p className="text-red-400 text-sm font-semibold mt-1">
                  {r.risk}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Trends;
