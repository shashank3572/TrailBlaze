const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getRecommendations } = require("../controllers/aiController");
const { getPersonalizedRoadmap } = require("../controllers/roadmapController");

router.get("/recommend", auth, getRecommendations);
router.get("/roadmap/:careerId", auth, getPersonalizedRoadmap);

router.get("/test", (req, res) => res.send("AI OK"));

module.exports = router;
