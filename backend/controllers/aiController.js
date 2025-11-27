console.log("🔥 aiController loaded");

const { generateRecommendations } = require("../utils/recommender");

const getRecommendations = async (req, res) => {
  try {
    console.log("🔥 getRecommendations called");
    console.log("req.user =", req.user);

    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User not attached in req.user" });
    }

    const result = await generateRecommendations(userId);

    return res.status(200).json({
      success: true,
      recommendations: result
    });

  } catch (error) {
    console.error("🔥 Recommendation Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Correct export
module.exports = { getRecommendations };
