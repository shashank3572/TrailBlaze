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
// Chat With AI
// -------------------------

const chatWithAI = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    // 1️⃣ Load user profile
    const user = await User.findById(userId).select("skills careerGoal interests");
    const userSkills = user?.skills || [];

    // 2️⃣ Load smart memory (long-term)
    const memoryDoc = await ChatMemory.findOne({ userId });
    const targetCareerName =
      memoryDoc?.career ||
      user?.careerGoal ||
      null;

    // 3️⃣ Load career data if we know the career
    let careerDoc = null;
    if (targetCareerName) {
      careerDoc = await Career.findOne({ title: targetCareerName });
    }

    // Prepare career-related text blocks
    const requiredSkillsText = careerDoc
      ? careerDoc.requiredSkills
          .map((s) => `${s.name} (importance: ${s.weight}, level: ${s.requiredLevel}/10)`)
          .join("; ")
      : "Not decided yet.";

    const roadmapText = careerDoc
      ? careerDoc.roadmap
          .map(
            (phase) =>
              `Phase ${phase.phaseNumber} – ${phase.title}: ` +
              (phase.steps || [])
                .map((step) => step.name)
                .join(", ")
          )
          .join("\n")
      : "No specific roadmap yet.";

    const coursesText = careerDoc
      ? careerDoc.courses
          .slice(0, 5)
          .map(
            (c) =>
              `• ${c.title} (${c.platform || "Resource"}) – ${c.url}`
          )
          .join("\n")
      : "No course list available yet.";

    // 4️⃣ Load short-term chat history (last few exchanges)
    let historyDoc = await ChatHistory.findOne({ userId });
    if (!historyDoc) {
      historyDoc = await ChatHistory.create({ userId, messages: [] });
    }

    const formattedHistory = historyDoc.messages
      .slice(-10)
      .map((msg) =>
        `${msg.role === "user" ? "User" : "Mentor"}: ${msg.content}`
      )
      .join("\n");

    // 5️⃣ Build system prompt (hybrid mentor tone)
    const systemPrompt = `
You are TrailBlaze AI Mentor — a friendly, structured career guide.

Tone:
- Clear, step-by-step
- Supportive and motivating
- Not overly formal, not cringe, just human and kind.

ALWAYS TRY TO INCLUDE:
1) A direct answer to the user's question.
2) 1–3 NEXT ROADMAP STEPS if a target career is known.
3) 1–3 COURSE RECOMMENDATIONS from the provided course list (only if relevant).
4) A short motivational note at the end.

If the user has no target career yet, help them explore options instead of forcing a roadmap.
Use simple language, as if the user is tired but trying their best.
`;

    // 6️⃣ Build full context for the LLM
    const context = `
User Profile:
- Skills: ${userSkills.join(", ") || "Not provided yet"}
- Target career: ${targetCareerName || "Not decided"}
  
Career Data:
Required skills:
${requiredSkillsText}

Roadmap:
${roadmapText}

Courses:
${coursesText}

Recent Conversation:
${formattedHistory}
`;

    const finalPrompt = `
${systemPrompt}

CONTEXT:
${context}

User: ${message}
Mentor:
`;

    // 7️⃣ Call Python LLM service (FastAPI)
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: finalPrompt }),
    });

    const data = await response.json();
    const reply = data.reply || "Sorry, I couldn't generate a proper response.";

    // 8️⃣ Save to ChatHistory
    historyDoc.messages.push({ role: "user", content: message });
    historyDoc.messages.push({ role: "assistant", content: reply });
    historyDoc.updatedAt = new Date();
    await historyDoc.save();

    // (Optional) VERY simple memory update (just store target career once user clearly states it)
    if (!memoryDoc && targetCareerName) {
      await ChatMemory.create({
        userId,
        career: targetCareerName,
        knownSkills: userSkills,
        preferences: { pace: "normal" },
        updatedAt: new Date(),
      });
    }

    return res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("❌ chatWithAI error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Chat service error" });
  }
};
// -------------------------
// Export all functions
// -------------------------
module.exports = {
  getRecommendations,
  getSkillGap,
  chatWithAI
};
