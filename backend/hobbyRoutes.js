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

// Get all hobbies
router.get("/", async (req, res) => {
  try {
    const hobbies = await Hobby.find();
    res.json(hobbies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hobbies", error: error.message });
  }
});

// Fetch a specific hobby by ID
router.get("/:id", async (req, res) => {
  try {
    const hobby = await Hobby.findById(req.params.id);
    if (!hobby) return res.status(404).json({ message: "Hobby not found" });
    res.json(hobby);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hobby" });
  }
});


module.exports = router;
