const mongoose = require("mongoose");

const weeklyTaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    careerTitle: { type: String, default: "" },

    // One document = one task
    title: { type: String, required: true },
    stepId: { type: String, required: true }, // roadmap step id
    estimateHours: { type: Number, default: 2 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeeklyTask", weeklyTaskSchema);
