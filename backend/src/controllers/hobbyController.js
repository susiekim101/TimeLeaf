class HobbyController {
  constructor(Hobby) {
    this.Hobby = Hobby;
  }

  async createHobby(req, res) {
    try {
      const { totalTimeSpent, dailyTimeSpent, extraNotes, aiInfo } = req.body;
      const newHobby = new this.Hobby({ totalTimeSpent, dailyTimeSpent, extraNotes, aiInfo });
      await newHobby.save();
      res.status(201).json(newHobby);
    } catch (error) {
      res.status(500).json({ message: "Error creating hobby", error });
    }
  }

  async getHobbies(req, res) {
    try {
      const hobbies = await this.Hobby.find();
      res.status(200).json(hobbies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hobbies", error });
    }
  }

  async updateHobby(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedHobby = await this.Hobby.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedHobby) {
        return res.status(404).json({ message: "Hobby not found" });
      }
      res.status(200).json(updatedHobby);
    } catch (error) {
      res.status(500).json({ message: "Error updating hobby", error });
    }
  }

  async deleteHobby(req, res) {
    try {
      const { id } = req.params;
      const deletedHobby = await this.Hobby.findByIdAndDelete(id);
      if (!deletedHobby) {
        return res.status(404).json({ message: "Hobby not found" });
      }
      res.status(200).json({ message: "Hobby deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting hobby", error });
    }
  }
}

module.exports = HobbyController;