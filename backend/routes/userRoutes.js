const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const recommendCareer = require("../utils/recommender");

//
// ✅ Get logged-in user profile
//
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//
// ✅ Add skill
//
router.post("/profile/add-skill", auth, async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ message: "Skill is required" });

    const user = await User.findById(req.user.id);
    user.skills.push(skill);
    await user.save();

    res.json({ message: "Skill added", skills: user.skills });
  } catch (err) {
    res.status(500).json({ message: "Failed to add skill" });
  }
});

//
// ✅ Remove skill
//
router.post("/profile/remove-skill", auth, async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ message: "Skill is required" });

    const user = await User.findById(req.user.id);
    user.skills = user.skills.filter((s) => s !== skill);
    await user.save();

    res.json({ message: "Skill removed", skills: user.skills });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove skill" });
  }
});

//
// ✅ AI Career Recommendation
//
router.get("/recommend", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const skills = user.skills || [];

    const recommended = recommendCareer(skills);

    res.json({ recommended });
  } catch (err) {
    res.status(500).json({ message: "AI recommendation failed" });
  }
});

module.exports = router;
