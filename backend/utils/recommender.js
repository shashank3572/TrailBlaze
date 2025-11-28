const axios = require("axios");
const User = require("../models/User");
const Career = require("../models/Career");

// URL for FastAPI ML Service
const ML_URL = "http://127.0.0.1:8000/predict";

async function generateRecommendations(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const userSkills = user.skills || [];
    console.log("🔍 Sending skills to ML model:", userSkills);

    // Send skills to FastAPI ML service
    const mlResponse = await axios.post(ML_URL, { skills: userSkills });

    const mlResults = mlResponse.data.results || [];

    // Match ML career names with real database data
    const careers = await Career.find();

    const finalOutput = mlResults.map((item) => {
      const matchedCareer = careers.find((c) =>
        c.title.toLowerCase() === item.career.toLowerCase()
      );

      return {
        careerId: matchedCareer?._id || null,
        title: item.career,
        confidence: item.confidence,
      };
    });

    return finalOutput;

  } catch (err) {
    console.error("❌ ML Recommendation Error:", err.message);
    return [];
  }
}

module.exports = { generateRecommendations };
