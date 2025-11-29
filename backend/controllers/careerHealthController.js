const { computeHealth } = require("../services/careerHealthService");
const { notifyMentor } = require("../utils/mentorEvent");


exports.getScore = async (req, res) => {
  const score = await computeHealth(req.user.id, req.params.careerId);

  await notifyMentor(
    req.user.id,
    `Updated career health score: ${score.score} (${score.label}). Briefly acknowledge progress next time.`
  );

  res.json(score);
};