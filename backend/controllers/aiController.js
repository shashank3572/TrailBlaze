console.log("🔥 aiController loaded");

const { generateRecommendations } = require("../utils/recommender");
const Career = require("../models/Career");
const User = require("../models/User");

// -------------------------
// Career Recommendation
// -------------------------
const getRecommendations = async (req, res) => {
  try {
    console.log("🔥 getRecommendations called");
    console.log("req.user =", req.user);

    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User not attached in req.user" });
    }

    const result = await generateRecommendations(userId);

    return res.status(200).json({
      success: true,
      recommendations: result
    });

  } catch (error) {
    console.error("🔥 Recommendation Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// -------------------------
// Skill Gap Analyzer
// -------------------------
const getSkillGap = async (req, res) => {
  try {
    const { careerId } = req.params;

    if (!careerId) return res.status(400).json({ message: "Career ID missing" });

    const user = await User.findById(req.user.id);
    const career = await Career.findById(careerId);

    if (!career) return res.status(404).json({ message: "Career not found" });

    const userSkills = user.skills.map(s => s.toLowerCase());

    const requiredSkills = career.requiredSkills.map(skill => ({
      name: skill.name,
      level: skill.requiredLevel,
      weight: skill.weight,
      status: userSkills.includes(skill.name.toLowerCase()) ? "present" : "missing"
    }));

    return res.json({
      career: career.title,
      present: requiredSkills.filter(s => s.status === "present").map(s => s.name),
      missing: requiredSkills.filter(s => s.status === "missing").map(s => s.name),
      totalRequired: requiredSkills.length,
      details: requiredSkills
    });

  } catch (err) {
    res.status(500).json({ message: "Skill gap analysis failed" });
  }
};

// -------------------------
// Export both functions
// -------------------------
module.exports = {
  getRecommendations,
  getSkillGap
};
