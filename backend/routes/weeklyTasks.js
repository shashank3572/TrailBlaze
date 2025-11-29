const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { generate, updateTaskStatus, getCurrent } = require("../controllers/weeklyTaskController");

// Generate weekly tasks
router.post("/", auth, generate);

// Fetch current week's tasks
router.get("/", auth, getCurrent);

// Update task completion
router.patch("/:taskId", auth, updateTaskStatus);

module.exports = router;
