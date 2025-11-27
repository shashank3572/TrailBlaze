const Career = require("../models/Career");
const User = require("../models/User");

module.exports = {
  getPersonalizedRoadmap: async (req, res) => {
    try {
      const { careerId } = req.params;

      // Get the career safely
      const career = await Career.findById(careerId);
      if (!career) return res.status(404).json({ message: "Career not found" });

      // Get logged in user
      const user = await User.findById(req.user._id);
      const userSkills = user?.skills?.map(s => s.toLowerCase()) || [];

      // Safe extract required skills
      const requiredSkills = (career.requiredSkills || []).map(
        (skill) => skill.name?.toLowerCase() || ""
      );

      // Separate completed vs missing skills
      const completedSkills = requiredSkills.filter((skill) =>
        userSkills.includes(skill)
      );

      const missingSkills = requiredSkills.filter(
        (skill) => !userSkills.includes(skill)
      );

      // Build HYBRID roadmap
      const personalizedRoadmap = (career.roadmap || []).map((phase) => ({
        phase: phase.phaseNumber,
        title: phase.title,
        steps: (phase.steps || []).map((step) => {
          const known = userSkills.some((s) =>
            step.name?.toLowerCase()?.includes(s)
          );

          return {
            id: step.id,
            name: step.name,
            status: known ? "completed" : "required"
          };
        }),
      }));

      return res.json({
        success: true,
        career: career.title,
        completedSkills,
        missingSkills,
        roadmap: personalizedRoadmap,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Roadmap generation failed" });
    }
  },
};
