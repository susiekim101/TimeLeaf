const express = require("express");
const HobbyController = require("../controllers/hobbyController");

const router = express.Router();
const hobbyController = new HobbyController();

// Define routes
router.post("/hobbies", hobbyController.createHobby.bind(hobbyController));
router.get("/hobbies", hobbyController.getHobbies.bind(hobbyController));
router.put("/hobbies/:id", hobbyController.updateHobby.bind(hobbyController));
router.delete("/hobbies/:id", hobbyController.deleteHobby.bind(hobbyController));

module.exports = router;