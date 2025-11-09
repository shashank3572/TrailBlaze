const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  careerTitle: { type: String, required: true },
  completedItemIds: { type: [String], default: [] }, // store item ids that are done
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema);
