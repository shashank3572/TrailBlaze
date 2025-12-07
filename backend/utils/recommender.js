const Career = require("../models/Career");
const axios = require("axios");

const ML_URL = "http://localhost:8010/predict";

/* ---------------------------------------------
   NORMALIZATION + SIMILARITY HELPERS
--------------------------------------------- */

function normalize(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

function isSimilar(a, b) {
  const A = normalize(a);
  const B = normalize(b);

  if (!A || !B) return false;
  if (A === B) return true;

  // Avoid tiny-word false positives
  if (A.length > 3 && B.length > 3 && (A.includes(B) || B.includes(A)))
    return true;

  // Token overlap
  const tokensA = A.split(" ").filter(t => t.length > 3);
  const tokensB = B.split(" ").filter(t => t.length > 3);

  return tokensA.some(t => tokensB.includes(t));
}

/* ---------------------------------------------
   MAIN RECOMMENDER FUNCTION (FIXED VERSION)
--------------------------------------------- */

async function recommendCareers(user) {
  /* ---------------------------------------------
     1️⃣ MERGE SKILLS FROM BOTH STRUCTURES
  --------------------------------------------- */

  let rawSkills = [];

  // Collect from new system
  if (Array.isArray(user.skillLevels)) {
    rawSkills.push(
      ...user.skillLevels.map(s => (typeof s === "string" ? s : s.name))
    );
  }

  // REMOVE LEGACY FIELD COMPLETELY
// Do NOT push user.skills at all


  // Normalize + Dedupe
  const skills = Array.from(
    new Set(
      rawSkills
        .filter(Boolean)
        .map(s => normalize(s))
    )
  );

  console.log("🔥 recommender using skills:", skills);

  const interests = (user.interests || []).map(normalize);

  // Fetch all careers
  const careers = await Career.find({});

  /* ---------------------------------------------
     2️⃣ RULE-BASED OVERLAP SCORING
  --------------------------------------------- */

  const ruleScores = careers.map(career => {
    let skillScore = 0;
    let interestScore = 0;

    // Skills
    if (skills.length > 0 && Array.isArray(career.requiredSkills)) {
      const matched = career.requiredSkills.filter(req => {
        const reqName = req.name || req;
        return skills.some(userSkill => isSimilar(userSkill, reqName));
      }).length;

      skillScore = matched / career.requiredSkills.length;
    }

    // Interests
    if (interests.length > 0 && Array.isArray(career.interestTags)) {
      const matchedTags = career.interestTags.filter(tag =>
        interests.some(int => isSimilar(int, tag))
      ).length;

      interestScore = matchedTags / (career.interestTags.length || 1);
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

  /* ---------------------------------------------
     3️⃣ MACHINE LEARNING LAYER (OPTIONAL)
  --------------------------------------------- */

  let mlScores = [];
  try {
    const response = await axios.post(ML_URL, { skills });
    mlScores = response.data.results || [];
  } catch (err) {
    console.log("⚠ ML offline — continuing without ML layer");
  }

  const mlMap = {};
  mlScores.forEach(item => {
    const name = normalize(item.career);
    mlMap[name] = item.confidence;
  });

  /* ---------------------------------------------
     4️⃣ HYBRID SCORE COMBINATION
  --------------------------------------------- */

  const final = ruleScores.map(career => {
    const mlConfidence = mlMap[normalize(career.title)] || 0;

    const finalScore =
      (career.ruleBasedScore * 0.6) +
      (mlConfidence * 0.4);

    return {
      ...career,
      mlConfidence: Number(mlConfidence.toFixed(2)),
      finalScore: Number(finalScore.toFixed(2)),
    };
  });

  final.sort((a, b) => b.finalScore - a.finalScore);

  return final;
}

module.exports = { recommendCareers };
