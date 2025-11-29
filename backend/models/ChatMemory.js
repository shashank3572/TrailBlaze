const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  career: { type: String },

  preferences: {
    hatesMath: { type: Boolean, default: false },
    prefersVideos: { type: Boolean, default: false },
    pace: { type: String, enum: ["slow", "normal", "fast"], default: "normal" }
  },

  knownSkills: { type: [String], default: [] },

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ChatMemory", memorySchema);
