const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: String,
  title: String,
  resource: String,
});

const sectionSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

const careerSchema = new mongoose.Schema({
  title: String,
  description: String,
  sections: [sectionSchema],
});

module.exports = mongoose.model("Career", careerSchema);
