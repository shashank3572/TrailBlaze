const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  roadmapStepId: String,
  title: String,
  phase: Number,
  estimateHours: Number,
  status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  completedAt: Date
});

const WeeklyTaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  careerId: String,
  weekStart: Date,
  weekEnd: Date,
  tasks: [TaskSchema],
  generatedFrom: { type: String, enum: ["auto", "manual"], default: "auto" }
}, { timestamps: true });

module.exports = mongoose.model("WeeklyTask", WeeklyTaskSchema);
