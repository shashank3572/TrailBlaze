const WeeklyTask = require("../models/WeeklyTask");
const UserProgress = require("../models/UserProgress");
const Career = require("../models/Career");
const { startOfWeek, endOfWeek } = require("../utils/dateUtils");

const DEFAULT_HOURS_PER_WEEK = 6;

async function generateWeeklyTasks(userId, careerId, hoursPerWeek = DEFAULT_HOURS_PER_WEEK) {
  
  // Fetch career & progress
  const career = await Career.findById(careerId);
  if (!career) throw new Error("Career not found");

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

  // extract all roadmap steps
  const allSteps = career.roadmap.flatMap(phase =>
    phase.steps.map(step => ({
      id: step.id,
      phase: parseInt(phase.phase),
      title: step.title,
      weight: step.optional ? 0.2 : 1 // optional -> lower priority
    }))
  );

  // filter incomplete steps
  const remainingSteps = allSteps.filter(
    step => !progress.completedItemIds.includes(step.id)
  );

  // sorting logic (smart ordering)
  remainingSteps.sort((a, b) => {
    // 1️⃣ Lower phase first
    if (a.phase !== b.phase) return a.phase - b.phase;
    // 2️⃣ Higher weight first
    return b.weight - a.weight;
  });

  // pick tasks up to user's weekly capacity
  let usedHours = 0;
  const tasksToAssign = [];

  for (const step of remainingSteps) {
    if (usedHours + 2 > hoursPerWeek) break; // assume 2h each task
    usedHours += 2;

    tasksToAssign.push({
      roadmapStepId: step.id,
      title: step.title,
      phase: step.phase,
      estimateHours: 2,
      status: "todo"
    });
  }

  // delete old tasks for this week (regenerate mode)
  const weekStart = startOfWeek();
  await WeeklyTask.deleteOne({ user: userId, careerId, weekStart });

  // store
  const entry = await WeeklyTask.create({
    user: userId,
    careerId,
    weekStart,
    weekEnd: endOfWeek(weekStart),
    tasks: tasksToAssign,
    generatedFrom: "auto"
  });

  return entry;
}

module.exports = { generateWeeklyTasks };
