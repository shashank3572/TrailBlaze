const WeeklyTask = require("../models/WeeklyTask");
const { notifyMentor } = require("../utils/mentorEvent");
const { generateWeeklyTasks } = require("../services/weeklyTaskService");
const UserProgress = require("../models/UserProgress");
const Career = require("../models/Career");
const { computeHealth } = require("../services/careerHealthService");

exports.generate = async (req, res) => {
  const entry = await generateWeeklyTasks(
    req.user.id,
    req.body.careerId,
    req.body.hoursPerWeek
  );

  res.json({
    message: "Weekly tasks generated",
    tasks: entry.tasks,
    weekStart: entry.weekStart,
    weekEnd: entry.weekEnd
  });
};

exports.getCurrent = async (req, res) => {
  const tasks = await WeeklyTask.find({ user: req.user.id, careerId: req.query.careerId });
  res.json(tasks);
};

exports.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body; // "done" or "reset"
  const userId = req.user.id;

  const taskDoc = await WeeklyTask.findOne({ "tasks._id": taskId });
  if (!taskDoc) return res.status(404).json({ message: "Task not found" });

  const task = taskDoc.tasks.id(taskId);
  task.status = status;

  await taskDoc.save();

  // sync with main progress
 // sync with main progress
let progress = await UserProgress.findOne({ userId, careerId: taskDoc.careerId });
const career = await Career.findById(taskDoc.careerId);

// Auto-create progress if missing
if (!progress) {
  progress = await UserProgress.create({
    userId,
    careerId: career._id,
    careerTitle: career.title,
    completedItemIds: [],
    completionRate: 0
  });
}

const stepId = task.roadmapStepId;

if (status === "done") {
  if (!progress.completedItemIds.includes(stepId)) {
    progress.completedItemIds.push(stepId);

    await notifyMentor(
      userId,
      `User completed task "${task.title}" from ${career.title}.`
    );
  }
} else {
  progress.completedItemIds = progress.completedItemIds.filter(id => id !== stepId);
}

// recalc completion rate
const totalSteps = career.roadmap.reduce((sum, p) => sum + p.steps.length, 0);
progress.completionRate = progress.completedItemIds.length / totalSteps;

await progress.save();


  // update health score
  const health = await computeHealth(userId, taskDoc.careerId);

  res.json({
    message: "Task updated",
    task: { id: taskId, status },
    updatedProgress: progress.completedItemIds,
    newHealthScore: health.score,
    healthLabel: health.label
  });
};