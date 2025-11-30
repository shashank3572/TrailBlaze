console.log("🔥 aiController loaded");

const { recommendCareers } = require("../utils/recommender");
const Career = require("../models/Career");
const User = require("../models/User");
const axios = require("axios");
const ChatHistory = require("../models/ChatHistory");
const ChatMemory = require("../models/ChatMemory");

// -------------------------
// Career Recommendation
// -------------------------
const getRecommendations = async (req, res) => {
  try {
    console.log("🔥 getRecommendations called");

    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User not attached in req.user" });
    }

    // Load full user profile (skills + interests)
    const fullUser = await User.findById(userId).lean();
    if (!fullUser) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    const result = await recommendCareers(fullUser);

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



// -------------------------
// Skill Gap Analyzer
// -------------------------
const getSkillGap = async (req, res) => {
  try {
    const { careerId } = req.params;

    if (!careerId)
      return res.status(400).json({ message: "Career ID missing" });

    const user = await User.findById(req.user.id);
    const career = await Career.findById(careerId);

    if (!career)
      return res.status(404).json({ message: "Career not found" });

    const userSkills = user.skills.map(s => s.toLowerCase());

    const requiredSkills = career.requiredSkills.map(skill => ({
      name: skill.name,
      level: skill.requiredLevel,
      weight: skill.weight,
      status: userSkills.includes(skill.name.toLowerCase()) ? "present" : "missing"
    }));

    return res.json({
      career: career.title,
      present: requiredSkills.filter(s => s.status === "present").map(s => s.name),
      missing: requiredSkills.filter(s => s.status === "missing").map(s => s.name),
      totalRequired: requiredSkills.length,
      details: requiredSkills
    });

  } catch (err) {
    res.status(500).json({ message: "Skill gap analysis failed" });
  }
};


// -------------------------
// CHAT WITH AI (WORKING VERSION)
// -------------------------
const ML_URL = process.env.ML_URL || "http://localhost:8010/chat";

const chatWithAI = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ success: false, error: "Message is required." });
    }

    // Fetch profile for personalization
    const user = await User.findById(userId).select("skills careerGoal");
    const userSkills = user?.skills || [];
    const targetCareer = user?.careerGoal || "Not selected";

    // Build LLM prompt
    const prompt = `
You are TrailBlaze AI mentor. Use a friendly tone.

User Skills: ${userSkills.join(", ") || "None"}
Career Focus: ${targetCareer}

User: ${message}
Assistant:
`;

    // ---- CALL ML SERVICE ----
    let reply = "⚠️ AI service offline";

    const response = await fetch(ML_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });

    const data = await response.json();
    if (data?.reply) reply = data.reply;

    // Cleanup formatting
    reply = reply
      .replace(/<\|assistant\|>/g, "")
      .replace(/<\|user\|>/g, "")
      .replace(/↵/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Keep first clean full sentence
    reply = reply.split(/(?<=\.)\s+/)[0];

    // Save to chat history
    await ChatHistory.updateOne(
      { userId },
      { $push: { messages: [
          { role: "user", content: message },
          { role: "assistant", content: reply }
        ]
      }},
      { upsert: true }
    );

    return res.json({ success: true, reply });

  } catch (error) {
    console.error("❌ chatWithAI error:", error);
    return res.status(500).json({ success: false, error: "Chat service failed" });
  }
};


module.exports = {
  chatWithAI,
  getRecommendations,
  getSkillGap
};