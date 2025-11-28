const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const UserProgress = require("../models/UserProgress");
const auth = require("../middleware/authMiddleware");

// ✅ Get all careers
router.get("/", async (req, res) => {
  const careers = await Career.find();
  res.json(careers);
});

// ✅ Get progress for selected career
router.get("/:careerTitle/progress", auth, async (req, res) => {
  try {
    const { careerTitle } = req.params;

    const progress = await UserProgress.findOne({
      userId: req.user.id,
      careerTitle,
    });

    res.json(progress || { completedItemIds: [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching progress" });
  }
});

// ✅ Save progress
router.post("/:careerTitle/progress", auth, async (req, res) => {
  try {
    const { completedItemIds } = req.body;
    const { careerTitle } = req.params;

    const updated = await UserProgress.findOneAndUpdate(
      { userId: req.user.id, careerTitle },
      { completedItemIds },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error saving progress" });
  }
});

// ✅ OPTIONAL: AI suggestion (super tiny AI)
router.get("/:careerTitle/suggest", async (req, res) => {
  const { careerTitle } = req.params;

  const suggestions = {
    "Full Stack Developer": "Learn System Design next — it's crucial before interviews.",
    "Data Scientist": "Start with Statistics fundamentals → then ML → then Python.",
    "Cloud Engineer": "Begin with Linux + Networking before touching AWS.",
  };

  res.json({
    message: suggestions[careerTitle] || "Expand your skills gradually and stay consistent!",
  });
});

router.get("/", async (req, res) => {
  try {
    const careers = await Career.find({}, "title _id");
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch careers" });
  }
});


module.exports = router;
