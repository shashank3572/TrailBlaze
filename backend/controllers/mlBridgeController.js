const axios = require("axios");
const User = require("../models/User");

const sendToML = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const payload = {
      skills: user.skills,
      interests: user.interests || [],
      experience: user.experience || 0
    };

    // Send data to Python server
    const response = await axios.post("http://localhost:8000/predict", payload);

    return res.json({
      fromML: response.data,
      sentPayload: payload
    });

  } catch (error) {
    console.error("ML Service Error:", error.message);
    res.status(500).json({ message: "Failed to communicate with ML service" });
  }
};

module.exports = { sendToML };
