// backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const skillLevelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 1, max: 10 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Existing:
    skills: { type: [String], default: [] },

    // 🔹 New: structured skill levels for adaptive roadmap
    skillLevels: {
  type: [
    {
      name: String,
      level: Number,
    },
  ],
  default: [],
},

    // New fields:
    educationLevel: { type: String, default: "" },
    experienceYears: { type: Number, default: 0 },
    interestTags: { type: [String], default: [] },
    careerGoal: { type: String, default: "" },
  },
  { timestamps: true }
);

// Hash password BEFORE saving if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords for login
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
