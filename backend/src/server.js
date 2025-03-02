require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const hobbyRoutes = require("./routes/hobbyRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/hobbies", hobbyRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));