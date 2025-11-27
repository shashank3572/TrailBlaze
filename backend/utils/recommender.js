const Career = require("../models/Career");
const User = require("../models/User");

// Normalize value 1–10 to 0–1
const normalize = (num, max = 10) => num / max;

async function generateRecommendations(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const careers = await Career.find();

  const userSkills = user.skills || [];
  const userInterests = user.interests || [];

  const scoredCareers = careers.map((career) => {

    // --- Skill Match Scoring ---
    let skillScore = 0;
    let maxPossibleSkillScore = 0;

    (career.requiredSkills || []).forEach((req) => {
      maxPossibleSkillScore += req.weight;

      if (userSkills.includes(req.name.toLowerCase())) {
        skillScore += req.weight;
      }
    });

    const skillMatchScore = maxPossibleSkillScore > 0
      ? (skillScore / maxPossibleSkillScore) * 100
      : 0;

    // --- Interest Match Scoring ---
    let matchedInterests = (career.interestTags || []).filter(tag =>
      userInterests.includes(tag)
    ).length;

    const interestMatchScore = career.interestTags?.length
      ? (matchedInterests / career.interestTags.length) * 100
      : 0;

    // --- Industry Score Weight (Normalize 1–10 to %)
    const industryScore = normalize(career.industryScore || 5) * 100;

    // --- Final Weighted Score ---
    const finalScore = (skillMatchScore * 0.6) + (interestMatchScore * 0.3) + (industryScore * 0.1);

    return {
      careerId: career._id,
      title: career.title,
      score: Math.round(finalScore),
      reason: `Skill Alignment: ${skillMatchScore.toFixed(1)}%, Interest Match: ${interestMatchScore.toFixed(1)}%`
    };
  });

  // Sort by best match
  const sorted = scoredCareers.sort((a, b) => b.score - a.score);

  return sorted.slice(0, 5); // return top 5
}

module.exports = { generateRecommendations };
