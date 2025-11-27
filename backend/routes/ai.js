const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getRecommendations } = require("../controllers/aiController");

router.get("/test", (req, res) => res.send("AI OK"));

// now require auth
router.get("/recommend", auth, getRecommendations);

module.exports = router;
