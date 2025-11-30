const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const UserProgress = require("../models/UserProgress");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");


// ✅ Get all careers
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find({}, "title _id");
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch careers" });
  }
});

// ✅ Get full roadmap data by title
router.get("/title/:title", async (req, res) => {
  try {
    const title = decodeURIComponent(req.params.title);

    const career = await Career.findOne({ title });

    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }

    res.json({
      title: career.title,
      description: career.description,
      roadmap: career.roadmap,
      courses: career.courses,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch career details" });
  }
});
// --- AUTOCOMPLETE MUST BE ABOVE PROGRESS --- 
// 🚨 NEW: Autocomplete Based on Skill Levels
router.get("/:careerTitle/autocomplete", auth, async (req, res) => {
  try {
    const encoded = req.params.careerTitle;
    const careerTitle = decodeURIComponent(encoded);

    const career = await Career.findOne({ title: careerTitle });
    if (!career) return res.status(404).json({ message: "Career not found" });

    const user = await User.findById(req.user.id);

    // 🛑 Fix: If user has no skill levels return empty autocomplete
    if (!user || !user.skillLevels || user.skillLevels.length === 0) {
      return res.json({ autoComplete: [] });
    }

    // Convert user skills to quick lookup
    const userSkills = Object.fromEntries(
      user.skillLevels.map((s) => [
        s.name.toLowerCase(),
        Number(s.level || 0)
      ])
    );

    const required = [
      ...(career.requiredSkills || []),
      ...(career.preferredSkills || [])
    ];

    let suggestions = [];

    for (const phase of career.roadmap) {
      for (const step of phase.steps) {
        const matchingRequirement = required.find((r) =>
          step.title.toLowerCase().includes(r.name.toLowerCase())
        );

        if (!matchingRequirement) continue;

        const userLevel = userSkills[matchingRequirement.name.toLowerCase()] || 0;
        const needed = Number(matchingRequirement.requiredLevel || 5);

        if (userLevel >= needed * 0.7) {
          suggestions.push(step.id);
        }
      }
    }

    return res.json({ autoComplete: suggestions });

  } catch (err) {
    console.error("🔥 Autocomplete Error:", err.message);
    res.status(500).json({ message: "Autocomplete failed", error: err.message });
  }
});

// --- PROGRESS (FIXED VERSION) ---

// Get progress + total roadmap step count
router.get("/:careerTitle/progress", auth, async (req, res) => {
  try {
    const encoded = req.params.careerTitle;
    const careerTitle = decodeURIComponent(encoded);

    // Find career to count steps
    const career = await Career.findOne({ title: careerTitle });
    if (!career) return res.status(404).json({ message: "Career not found" });

    const totalItems = career.roadmap.reduce(
      (sum, phase) => sum + phase.steps.length,
      0
    );

    // Fetch saved progress
    const progress = await UserProgress.findOne({
      userId: req.user.id,
      careerTitle: { $regex: new RegExp(`^${careerTitle}$`, "i") }
    });

    res.json({
      completedItemIds: progress?.completedItemIds || [],
      totalItems
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching progress" });
  }
});


// Save progress
router.post("/:careerTitle/progress", auth, async (req, res) => {
  try {
    const raw = req.params.careerTitle;
    const careerTitle = decodeURIComponent(raw);
    const { completedItemIds } = req.body;

    const updated = await UserProgress.findOneAndUpdate(
      {
        userId: req.user.id,
        careerTitle: { $regex: new RegExp(`^${careerTitle}$`, "i") },
      },
      { careerTitle, completedItemIds },
      { upsert: true, new: true }
    );

    res.json({
  completedItemIds: updated.completedItemIds,
  message: "Progress saved"
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving progress" });
  }
});

// 🔥 Optional AI Suggestion
router.get("/:careerTitle/suggest", async (req, res) => {
  const { careerTitle } = req.params;

  const suggestions = {
    "Full-Stack Developer": "Focus on DevOps next — CI/CD is becoming essential.",
    "Data Scientist": "Strengthen probability & statistics next.",
    "Cloud Engineer": "Networking fundamentals before AWS/GCP."
  };

  res.json({
    message: suggestions[careerTitle] || "Keep learning consistently — small steps compound!"
  });
});

module.exports = router;
