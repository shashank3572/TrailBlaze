const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

// Keep only last 20 messages
chatHistorySchema.pre("save", function (next) {
  if (this.messages.length > 20) {
    this.messages = this.messages.slice(-20);
  }
  next();
});

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
