const UserProgress = require("../models/UserProgress");
const Career = require("../models/Career");

async function getOrCreateProgress(userId, careerId) {
  let progress = await UserProgress.findOne({ user: userId, careerId });


  if (!progress) {
    const career = await Career.findById(careerId);
    if (!career) throw new Error("Career not found");

    const steps = [];
    career.roadmap.forEach((phase, pIndex) => {
      phase.steps.forEach((step, sIndex) => {
        steps.push({
          stepId: `${pIndex}-${sIndex}`,
          title: step.title,
          phase: pIndex + 1,
          status: "pending",
          estimatedHours: step.estimatedHours || 2,
        });
      });
    });

    progress = await UserProgress.create({
  userId,
  careerId,
  careerTitle: career.title,
  completedItemIds: [],         // default empty array
  completionRate: 0
});


  }

  return progress;
}

function updateCompletion(progress) {
  const total = progress.steps.length;
  const completed = progress.steps.filter(s => s.status === "completed").length;
  progress.completionRate = completed / total;
}

module.exports = { getOrCreateProgress, updateCompletion };
