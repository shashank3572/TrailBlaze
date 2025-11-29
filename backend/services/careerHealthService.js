const CareerHealth = require("../models/CareerHealth");
const UserProgress = require("../models/UserProgress");
const WeeklyTask = require("../models/WeeklyTask");
const Career = require("../models/Career");

async function computeHealth(userId, careerId) {
  const career = await Career.findById(careerId);

  if (!career) {
    throw new Error("Career not found");
  }

  // ensure progress exists
  let progress = await UserProgress.findOne({ userId, careerId });

  if (!progress) {
    progress = await UserProgress.create({
      userId,
      careerId,
      careerTitle: career.title,
      completedItemIds: [],
      completionRate: 0
    });
  }

  // total roadmap steps
  const totalSteps = career.roadmap.reduce(
    (sum, phase) => sum + phase.steps.length,
    0
  );

  const completionRate = progress.completedItemIds.length / totalSteps;

  // weekly task consistency calculation
  const weeklyPlans = await WeeklyTask.find({ user: userId, careerId }).sort({
    createdAt: -1
  });

  let consistency = 0;

  if (weeklyPlans.length > 0) {
    const latest = weeklyPlans[0];
    const total = latest.tasks.length || 1;
    const done = latest.tasks.filter(t => t.status === "done").length;
    consistency = done / total;
  }

  const score = Math.round(
    (completionRate * 0.6 + consistency * 0.4) * 100
  );

  const label =
    score < 40
      ? "Beginner"
      : score < 70
      ? "Improving"
      : score < 90
      ? "Strong"
      : "Job Ready";

  const snapshot = await CareerHealth.create({
    user: userId,
    careerId,
    score,
    label,
    breakdown: {
      completionRate,
      consistency
    }
  });

  return snapshot;
}

module.exports = { computeHealth };
