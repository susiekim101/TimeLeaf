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
      weeklyTimeSpent: [10, 5, 2, 0, 3, 6, 4],
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

// // ✅ Update time spent on a hobby (total & weekly)
// router.put("/:id/update-time", async (req, res) => {
//   try {
//     const { dayIndex, timeSpent } = req.body; // Expect dayIndex (0-6) and timeSpent in minutes

//     if (dayIndex < 0 || dayIndex > 6 || typeof timeSpent !== "number") {
//       return res.status(400).json({ message: "Invalid day index or time spent value." });
//     }

//     const hobby = await Hobby.findById(req.params.id);
//     if (!hobby) {
//       return res.status(404).json({ message: "Hobby not found" });
//     }

//     // Update total time spent
//     hobby.totalTimeSpent += timeSpent;

//     // Update weekly time spent for the specific day
//     hobby.weeklyTimeSpent[dayIndex] += timeSpent;

//     await hobby.save();
//     res.json({ message: "Time updated successfully", hobby });
//   } catch (error) {
//     console.error("Error updating time:", error);
//     res.status(500).json({ message: "Error updating time", error: error.message });
//   }
// });

// // Update total time and weekly time for a hobby
// router.post("/:id/update-time", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { timeSpent, dayIndex } = req.body; // timeSpent in seconds, dayIndex 0-6

//     if (timeSpent === undefined || dayIndex === undefined) {
//       return res.status(400).json({ message: "Time spent and day index are required." });
//     }

//     const hobby = await Hobby.findById(id);
//     if (!hobby) {
//       return res.status(404).json({ message: "Hobby not found." });
//     }

//     // Update total time
//     hobby.totalTimeSpent += timeSpent;

//     // Update weekly time
//     hobby.weeklyTimeSpent[dayIndex] += timeSpent;

//     await hobby.save();

//     res.json({ message: "Time updated successfully", hobby });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating time", error: error.message });
//   }
// });

router.post("/:id/update-time", async (req, res) => {
  try {
    const { id } = req.params;
    const { timeSpent, dayIndex } = req.body;

    if (timeSpent === undefined || dayIndex === undefined) {
      return res.status(400).json({ message: "Time spent and day index are required." });
    }

    if (dayIndex < 0 || dayIndex > 6) {
      return res.status(400).json({ message: "Invalid day index. Must be between 0 and 6." });
    }

    const hobby = await Hobby.findById(id);
    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found." });
    }

    // Ensure weeklyTimeSpent is an array of length 7
    if (!Array.isArray(hobby.weeklyTimeSpent) || hobby.weeklyTimeSpent.length !== 7) {
      hobby.weeklyTimeSpent = Array(7).fill(0);
    }

    // Ensure current day's value exists
    if (typeof hobby.weeklyTimeSpent[dayIndex] !== "number") {
      hobby.weeklyTimeSpent[dayIndex] = 0;
    }

    // Update total and weekly time
    hobby.totalTimeSpent = (hobby.totalTimeSpent || 0) + timeSpent;
    hobby.weeklyTimeSpent[dayIndex] += timeSpent;

    await hobby.save();

    res.json({ message: "Time updated successfully", hobby });
  } catch (error) {
    res.status(500).json({ message: "Error updating time", error: error.message });
  }
});



module.exports = router;
