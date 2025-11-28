const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { getCourseRecommendations } = require("../controllers/courseController");

// Route: GET /courses/recommend/:careerId
router.get("/recommend/:careerId", auth, getCourseRecommendations);

module.exports = router;
