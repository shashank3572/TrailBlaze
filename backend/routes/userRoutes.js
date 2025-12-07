const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const { recommendCareers } = require("../utils/recommender");

// ---------------------------
// GET USER PROFILE
// ---------------------------
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------
// UPDATE PROFILE (FIXED)
// ---------------------------
router.post("/update-profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = req.body;

    // Update skillLevels
    if (updates.skillLevels) {
      user.skillLevels = updates.skillLevels;
      user.skills = []; // 🔥 clear old legacy skills
      user.careerGoal = ""; // 🔥 force new recommendation
    }

    // Normal profile fields
    if (updates.educationLevel) user.educationLevel = updates.educationLevel;
    if (updates.interestTags) user.interestTags = updates.interestTags;
    if (updates.experienceYears !== undefined)
      user.experienceYears = updates.experienceYears;

    // Manually set career goal
    if (updates.careerGoal !== undefined)
      user.careerGoal = updates.careerGoal;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});


// ---------------------------
// CAREER RECOMMENDATION
// ---------------------------
router.get("/recommend", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // Use BOTH skill systems
    const hasSkills =
      (user.skillLevels && user.skillLevels.length > 0) ||
      (user.skills && user.skills.length > 0);

    if (!hasSkills) {
      return res.json({
        recommended: null,
        message: "Add some skills to get recommendations."
      });
    }

    const results = await recommendCareers(user);

    res.json({
      recommended: results?.[0]?.title || null,
      score: results?.[0]?.finalScore || 0,
      recommendations: results
    });

  } catch (err) {
    console.error("RECOMMENDER ERROR:", err);
    res.status(500).json({ message: "AI recommendation failed" });
  }
});


module.exports = router;
