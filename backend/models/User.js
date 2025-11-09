const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  skills: { type: [String], default: [] }
});

// ✅ Pre-save hook → hash password ONLY if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Password check method → REQUIRED FOR LOGIN
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
