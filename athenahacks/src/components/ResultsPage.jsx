import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ResultsPage.css';
import PassionCard from './PassionCard.tsx';
import GatherHobby from './GatherHobby.jsx';
import { Link } from 'react-router-dom';

function ResultsPage({ results }) {
  const navigate = useNavigate();

  // If no results, redirect to welcome page
  if (!results) {
    navigate('/welcomepage');
    return null;
  }

  const { passions, explanation, recommendations } = results;

  const handleRetakeQuiz = () => {
    navigate('/welcomepage');
  };

  return (
    <div className="results-container">
      <h1 className="passionresults-title">Your Passion Discovery Results</h1>

      <section className="results-section">
        <h2 className="section-title">Your Top Passions</h2>

        <div className="passions-list">
          {passions.map((passion, index) => (
            <PassionCard key={index} name={passion.name} description={passion.description}/>
          ))}
        </div>

      </section>

      <section className="results-section">
        <h2 className="section-title">Why These Passions Match You</h2>
        <p className="recommendation-list">{explanation}</p>
      </section>

      <section className="results-section">
        <h2>Recommended Next Steps</h2>
        <ul className="recommendations-list">
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </section>

      <section className="results-section">
          <div className="hobbies-list">
              <GatherHobby description={passions.map(passion => passion.name)}/>
          </div>
      </section>

      <div className="actions">
        <button className="actions-button" onClick={handleRetakeQuiz}>
          Retake Quiz
        </button>
        <button className="actions-button" onClick={() => window.print()}>
          Save My Results
        </button>
      </div>

      <div>
        <Link to="/addhobby">
          <button className="addHobby-button">Continue</button>
        </Link>
      </div>
    </div>
  );
}

export default ResultsPage;