import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EndPage.css';

function EndPage({ answers, setResults }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Format answers data to include question text for better context
      const formattedAnswers = Object.entries(answers).map(([key, value]) => {
        const questionNumber = parseInt(key.replace('question', ''));
        return {
          questionNumber,
          answer: value
        };
      });

      // For development/testing - simulate API response
      // In production, uncomment the axios code below
      setTimeout(() => {
        const mockResults = {
          passions: [
            {
              name: "Creative Technology",
              description: "You enjoy combining artistic expression with technical problem-solving"
            },
            {
              name: "Environmental Conservation",
              description: "You value nature and are drawn to protecting our planet's resources"
            },
            {
              name: "Educational Leadership",
              description: "You have a talent for helping others learn and grow"
            }
          ],
          explanation: "Based on your responses, you show a strong preference for activities that combine creativity with analytical thinking. You also value making a positive impact on both people and the environment.",
          recommendations: [
            "Explore digital art or interactive design workshops",
            "Consider volunteering with local conservation efforts",
            "Look into mentorship opportunities in your community",
            "Join online communities related to your passion areas",
            "Set aside time each week to develop skills in these areas"
          ]
        };
        
        setResults(mockResults);
        setIsLoading(false);
        navigate('/results');
      }, 2000);

      // Uncomment for actual API usage
      /*
      const response = await axios.post('/api/gemini/analyze-passion', { answers: formattedAnswers });
      
      // Store results in state
      setResults(response.data);
      
      // Navigate to results page
      navigate('/results');
      */
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('There was an error processing your results. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="end-container">
      <h1>Quiz Completed!</h1>
      <p>Thank you for taking the time to complete our Passion Discovery Quiz.</p>
      <p>Click the button below to analyze your responses and discover your passions!</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="submit-button" 
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing your responses...' : 'Discover My Passions'}
      </button>
      
      <div className="disclaimer">
        <p>Your answers will be analyzed to suggest potential passions and interests. 
        This is meant as a starting point for self-discovery, not a definitive assessment.</p>
      </div>
    </div>
  );
}

export default EndPage;