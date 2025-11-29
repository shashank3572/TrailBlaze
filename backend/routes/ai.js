const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getRecommendations, getSkillGap, chatWithAI } = require("../controllers/aiController");

// Test route
router.get("/test", (req, res) => res.json({ message: "AI route working" }));

// Main endpoints
router.get("/recommend", auth, getRecommendations);
router.get("/skill-gap/:careerId", auth, getSkillGap);
router.post("/chat", auth, chatWithAI);
router.get("/ml-test", async (req, res) => {
  try {
    const axios = require("axios");
    const result = await axios.get("http://localhost:8000/");
    res.json({ reachable: true, data: result.data });
  } catch (err) {
    res.json({ reachable: false, error: err.message });
  }
});
router.post("/ml-predict-test", async (req, res) => {
  try {
    const axios = require("axios");
    const body = { skills: ["Python", "Machine Learning"] };
    const result = await axios.post("http://localhost:8000/predict", body);
    res.json({ success: true, result: result.data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});


module.exports = router;
