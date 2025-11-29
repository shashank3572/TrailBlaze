const UserProgress = require("../models/UserProgress");
const Career = require("../models/Career");
const { getOrCreateProgress, updateCompletion } = require("../services/progressService");
const { notifyMentor } = require("../utils/mentorEvent");

exports.getProgress = async (req, res) => {
  const progress = await getOrCreateProgress(req.user.id, req.params.careerId);
  res.json(progress);
};

exports.updateStep = async (req, res) => {
  const { careerId, stepId } = req.params;
  const { status } = req.body; // "completed" or "reset"
  const userId = req.user.id;

  // Fetch the career
  const career = await Career.findById(careerId);
  if (!career) return res.status(404).json({ message: "Career not found" });

  // Find progress entry OR create one if missing
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

  // Extract all valid step IDs from roadmap
  const roadmapSteps = career.roadmap.flatMap(phase =>
    phase.steps.map(step => step.id)
  );

  // Validate step id exists
  if (!roadmapSteps.includes(stepId)) {
    return res.status(400).json({ message: "Invalid stepId" });
  }

  // Update completion list
  if (status === "completed") {
    if (!progress.completedItemIds.includes(stepId)) {
      progress.completedItemIds.push(stepId);

      await notifyMentor(
        userId,
        `User completed activity: "${stepId}" from career "${career.title}".`
      );
    }
  } else if (status === "reset") {
    progress.completedItemIds = progress.completedItemIds.filter(id => id !== stepId);
  }

  // Recalculate completion percentage
  progress.completionRate = progress.completedItemIds.length / roadmapSteps.length;

  await progress.save();

  res.json({
    message: "Progress updated",
    completionRate: progress.completionRate,
    completedItemIds: progress.completedItemIds
  });
};