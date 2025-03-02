const express = require("express");
const multer = require("multer");
const Hobby = require("./hobbyModel");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Store images temporarily

// add new hobby
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body; // Only extracting `name` because others are missing

    const newHobby = new Hobby({
      name,
      image: req.file ? `/uploads/${req.file.filename}` : "", // Save image path
      totalTimeSpent: 0,  // Default to 0
      weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0], // Default to an array of 0s
      notes: null, // Default to null
      additionalInfo: null // Default to null
    });

    await newHobby.save();
    res.status(201).json({ message: "Hobby added successfully", hobby: newHobby });

  } catch (error) {
    console.error("Error adding hobby:", error);
    console.error("Is it going here?");
    res.status(500).json({ message: "Error adding hobby", error });
  }
});


// Get all hobbies
router.get("/", async (req, res) => {
  try {
    const hobbies = await Hobby.find();
    res.json(hobbies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hobbies", error });
  }
});

module.exports = router;
