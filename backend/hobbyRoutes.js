const express = require("express");
const Hobby = require("./hobbyModel");

const router = express.Router();

// Add new hobby
router.post("/add", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debug log

    const { name, image } = req.body; // Expect image to be a URL now

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image URL are required." });
    }

    const newHobby = new Hobby({
      name,
      image, // Save image as URL
      totalTimeSpent: 0,
      weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0],
      notes: null,
      additionalInfo: null
    });

    await newHobby.save();
    res.status(201).json({ message: "Hobby added successfully", hobby: newHobby });

  } catch (error) {
    console.error("Error adding hobby:", error);
    res.status(500).json({ message: "Error adding hobby", error: error.message });
  }
});

module.exports = router;
