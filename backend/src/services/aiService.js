const axios = require("axios");

const generateAIInfo = async (hobbyDescription) => {
  try {
    const response = await axios.post(process.env.AI_API_URL, {
      prompt: `Provide detailed information about the hobby: ${hobbyDescription}`,
      max_tokens: 150,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating AI information:", error);
    throw new Error("Failed to generate AI information");
  }
};

module.exports = { generateAIInfo };