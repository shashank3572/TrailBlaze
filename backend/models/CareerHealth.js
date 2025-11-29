const mongoose = require("mongoose");

const CareerHealthSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  careerId: String,
  score: Number,
  label: String,
  breakdown: {
    skillCoverage: Number,
    roadmapCompletion: Number,
    consistency: Number,
    mlConfidence: Number
  }
}, { timestamps: true });

module.exports = mongoose.model("CareerHealth", CareerHealthSchema);
