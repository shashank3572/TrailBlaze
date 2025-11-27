const mongoose = require("mongoose");

const requiredSkillSchema = new mongoose.Schema({
  name: { type: String, required: false },
  requiredLevel: { type: mongoose.Schema.Types.Mixed, default: null },
  weight: { type: Number, default: 0 },
}, { _id: false });

// Roadmap step schema (VERY flexible)
const roadmapStepSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String }, // if exists
  title: { type: String }, // if dataset uses title instead of name
  step: { type: String }, // fallback
  skillLevelRequired: { type: mongoose.Schema.Types.Mixed, default: null },
  optional: { type: Boolean, default: false },
}, { _id: false });

const roadmapPhaseSchema = new mongoose.Schema({
  phaseNumber: { type: Number },
  title: { type: String },
  phase: { type: String }, // if dataset uses this name
  steps: { type: [roadmapStepSchema], default: [] },
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String },
  name: { type: String }, // fallback if title missing
  url: { type: String },
  platform: { type: String, default: "unknown" },
  level: { type: String, default: "beginner" },
}, { _id: false });

const preferredSkillSchema = new mongoose.Schema({
  name: { type: String },
  weight: { type: Number, default: 0 },
  requiredLevel: { type: mongoose.Schema.Types.Mixed, default: null },
}, { _id: false });

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true },

  requiredSkills: { type: [requiredSkillSchema], default: [] },

  // Accept EITHER array of strings OR array of objects
  preferredSkills: { type: [mongoose.Schema.Types.Mixed], default: [] },

  experienceReq: { type: mongoose.Schema.Types.Mixed, default: null },
  interestTags: { type: [String], default: [] },
  industryTags: { type: [String], default: [] },
  industryScore: { type: Number, default: null },

  roadmap: { type: [roadmapPhaseSchema], default: [] },

  courses: { type: [courseSchema], default: [] },

}, { timestamps: true });

module.exports = mongoose.model("Career", careerSchema);
