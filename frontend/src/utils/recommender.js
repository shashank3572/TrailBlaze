export function recommendCareer(skills = []) {
  if (!skills || skills.length === 0) 
    return "Add skills to get recommendations";

  const s = skills.map((x) => x.toLowerCase());

  // AI/ML Engineer
  if (
    s.includes("ai") ||
    s.includes("ml") ||
    s.includes("machine learning") ||
    s.includes("deep learning") ||
    s.includes("neural network")
  ) {
    return "AI/ML Engineer";
  }

  // Data Scientist
  if (
    (s.includes("python") && s.includes("data")) ||
    s.includes("pandas") ||
    s.includes("statistics") ||
    s.includes("data analysis")
  ) {
    return "Data Scientist";
  }

  // Full Stack Developer
  if (
    (s.includes("javascript") && s.includes("node")) ||
    s.includes("full stack") ||
    (s.includes("frontend") && s.includes("backend"))
  ) {
    return "Full Stack Developer";
  }

  // Product/Project Manager
  if (
    s.includes("management") ||
    s.includes("product") ||
    s.includes("scrum") ||
    s.includes("agile") ||
    s.includes("project")
  ) {
    return "Product/Project Manager";
  }

  // Digital Marketing
  if (
    s.includes("marketing") ||
    s.includes("seo") ||
    s.includes("social media") ||
    s.includes("ads") ||
    s.includes("content")
  ) {
    return "Digital Marketing";
  }

  // Default fallback
  return "Full Stack Developer";
}
