const mongoose = require("mongoose");

const HobbySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // Store image URL
  totalTimeSpent: { type: Number, default: 0 },
  weeklyTimeSpent: { type: [Number], default: Array(7).fill(10) },
  notes: { type: String },
  additionalInfo: { type: String } // AI-generated info
});

module.exports = mongoose.model("Hobby", HobbySchema);
