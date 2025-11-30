const WeeklyTask = require("../models/WeeklyTask");
const User = require("../models/User");
const Career = require("../models/Career");

// POST /api/weekly-tasks
// Generate a fresh set of weekly tasks from the user's current careerGoal
exports.generate = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || !user.careerGoal) {
      return res.status(400).json({
        message: "Please set a career goal first (in Profile or Dashboard).",
      });
    }

    const career = await Career.findOne({ title: user.careerGoal });
    if (!career) {
      return res.status(404).json({ message: "Career not found for tasks." });
    }

    // Flatten roadmap steps
    const allSteps = career.roadmap.flatMap((phase) =>
      phase.steps.map((step) => ({
        title: step.title,
        stepId: step.id,
        estimateHours: step.estimateHours || 2,
      }))
    );

    if (allSteps.length === 0) {
      return res.status(400).json({ message: "No steps found in roadmap." });
    }

    // Pick 5 random steps as weekly tasks
    const selection = [...allSteps]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    // Remove previous tasks for this user + career
    await WeeklyTask.deleteMany({ userId, careerTitle: user.careerGoal });

    // Insert new tasks
    const created = await WeeklyTask.insertMany(
      selection.map((s) => ({
        userId,
        careerTitle: user.careerGoal,
        title: s.title,
        stepId: s.stepId,
        estimateHours: s.estimateHours,
        completed: false,
      }))
    );

    return res.json({
      message: "Weekly tasks generated",
      tasks: created,
    });
  } catch (err) {
    console.error("WeeklyTask.generate error:", err);
    res.status(500).json({ message: "Server error generating tasks" });
  }
};

// GET /api/weekly-tasks
// Return all tasks for this user (optionally filter by careerTitle later)
exports.getCurrent = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await WeeklyTask.find({ userId }).sort({ createdAt: 1 });

    return res.json({ tasks });
  } catch (err) {
    console.error("WeeklyTask.getCurrent error:", err);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
};

// PATCH /api/weekly-tasks/:taskId
// Toggle completion flag
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;
    const userId = req.user.id;

    const updated = await WeeklyTask.findOneAndUpdate(
      { _id: taskId, userId },
      { completed: !!completed },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({
      message: "Task updated",
      task: updated,
    });
  } catch (err) {
    console.error("WeeklyTask.updateTaskStatus error:", err);
    res.status(500).json({ message: "Server error updating task" });
  }
};
