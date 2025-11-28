const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getRecommendations, getSkillGap } = require("../controllers/aiController");

// Test
router.get("/test", (req, res) => res.json({ message: "AI route working" }));

router.get("/recommend", auth, getRecommendations);
router.get("/skill-gap/:careerId", auth, getSkillGap);

module.exports = router;
