const Career = require("../models/Career");
const axios = require("axios");

const ML_URL = "http://localhost:8000/predict";

async function recommendCareers(user) {

  // normalize user input (safe fallback)
  const rawSkills = user.skills || [];
  const interests = user.interests || [];

  // FIX: convert skill objects → plain lowercase strings
  const skills = rawSkills.map(s =>
    typeof s === "string" ? s.toLowerCase() : s.name.toLowerCase()
  );

  // fetch all careers
  const careers = await Career.find({});

  // basic scoring: proportional to count overlap
  const ruleScores = careers.map((career) => {
    let skillScore = 0;
    let interestScore = 0;

    // Skill overlap score
    if (skills.length > 0 && career.requiredSkills) {
      const matched = career.requiredSkills.filter(req =>
        skills.includes(req.name.toLowerCase())
      ).length;

      skillScore = matched / career.requiredSkills.length;
    }

    // Interest overlap score
    if (interests.length > 0 && career.interestTags) {
      const matchingTags = career.interestTags.filter(tag =>
        interests.some(i => tag.toLowerCase().includes(i.toLowerCase()))
      ).length;

      interestScore = matchingTags / career.interestTags.length;
    }

    const ruleBasedScore = (skillScore * 0.7) + (interestScore * 0.3);

    return {
      careerId: career._id,
      title: career.title,
      skillScore: Number(skillScore.toFixed(2)),
      interestScore: Number(interestScore.toFixed(2)),
      ruleBasedScore: Number(ruleBasedScore.toFixed(2)),
    };
  });

  // ---- ML Recommendation Layer ----
  let mlScores = [];
  try {
    const response = await axios.post(ML_URL, { skills });
    mlScores = response.data.results || [];
  } catch (err) {
    console.log("⚠ ML offline — continuing without it");
  }

  // Convert ML list into lookup
  const mlMap = {};
  mlScores.forEach(item => {
    mlMap[item.career.toLowerCase()] = item.confidence;
  });


  // ---- Combine rule-based + ML ----
  const final = ruleScores.map((career) => {
    const mlConfidence = mlMap[career.title.toLowerCase()] || 0;
    const finalScore = (career.ruleBasedScore * 0.6) + (mlConfidence * 0.4);

    return {
      ...career,
      mlConfidence: Number(mlConfidence.toFixed(2)),
      finalScore: Number(finalScore.toFixed(2))
    };
  });

  // Sort high → low relevance
  final.sort((a, b) => b.finalScore - a.finalScore);

  return final;
}

module.exports = { recommendCareers };
