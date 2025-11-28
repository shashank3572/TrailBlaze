const Career = require("../models/Career");
const User = require("../models/User");

const getCourseRecommendations = async (req, res) => {
  try {
    const { careerId } = req.params;

    if (!careerId) return res.status(400).json({ message: "Career ID required" });

    // 1. Fetch user & career
    const user = await User.findById(req.user.id);
    const career = await Career.findById(careerId);

    if (!career) return res.status(404).json({ message: "Career not found" });

    const userSkills = user.skills.map(s => s.toLowerCase());

    // 2. Identify missing skills
    const missingSkills = career.requiredSkills.filter(
      skill => !userSkills.includes(skill.name.toLowerCase())
    );

    // 3. Match courses by missing skills
    const recommendedCourses = missingSkills.map(skill => {
      const relatedCourses = career.courses.filter(
        course =>
          course.title.toLowerCase().includes(skill.name.toLowerCase()) ||
          (course.level && skill.requiredLevel >= 5) // simple fallback logic
      );

      return {
        skill: skill.name,
        neededLevel: skill.requiredLevel,
        foundCourses: relatedCourses.length > 0 ? relatedCourses : "No direct match (needs manual suggestion)"
      };
    });

    res.json({
      success: true,
      career: career.title,
      missingSkills: missingSkills.map(s => s.name),
      recommendations: recommendedCourses
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Course recommendation failed" });
  }
};

module.exports = { getCourseRecommendations };
