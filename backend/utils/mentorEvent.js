const ChatHistory = require("../models/ChatHistory");

async function notifyMentor(userId, message) {
  await ChatHistory.create({
    userId,          // ✔ matches schema
    role: "system",
    message,
    timestamp: new Date(),
  });
}

module.exports = { notifyMentor };
