const mongoose = require("mongoose");

const hobbySchema = new mongoose.Schema({
  totalTimeSpent: {
    type: Number,
    required: true,
  },
  dailyTimeSpent: {
    type: [Number],
    required: true,
  },
  extraNotes: {
    type: String,
    default: "",
  },
  aiGeneratedInfo: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const Hobby = mongoose.model("Hobby", hobbySchema);

module.exports = Hobby;