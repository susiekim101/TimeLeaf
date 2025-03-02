import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage.tsx';
import WelcomePage from './components/WelcomePage.jsx';
import QuestionPage from './components/QuestionPage.jsx';
import DiscoveryQuiz from './components/DiscoveryQuiz.jsx';
import ResultsPage from './components/ResultsPage';
import EndPage from './components/EndPage';
import AddHobby from './components/AddHobby.jsx';
import HomePage from './components/HomePage.jsx';
import Stopwatch from './components/Stopwatch';
import Notes from './components/Notes';
import Tracker from './components/Tracker';
import { useState } from 'react';

function App() {
  // State and questions moved from DiscoveryQuiz
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  
  const questions = [
    {
      question: 'Do you prefer indoor or outdoor activities?',
      options: ['Indoor', 'Outdoor', 'Neutral'],
    },
    {
      question: 'What kind of content do you enjoy consuming most?',
      options: ['Documentaries and educational videos', 'Creative writing and fiction', 'News and current events', 'How-to tutorials and DIY projects'],
    },
    {
      question: 'If you had a free afternoon, what would you most likely do?',
      options: ['Work on a personal creative project', 'Learn a new skill or technology', 'Volunteer at a local charity', 'Go for a hike or bike ride'],
    },
    {
      question: 'Which of these subjects are you most interested in?',
      options: ['Literature and languages', 'Science and technology', 'Social sciences and psychology', 'Physical education and sports'],
    },
    {
      question: 'What best describes your preferred work environment?',
      options: ['Collaborative and creative', 'Analytical and structured', 'Community-focused and supportive', 'Active and dynamic'],
    },
    {
      question: 'Which of these hobbies appeals to you the most?',
      options: ['Painting or playing a musical instrument', 'Coding or building electronics', 'Mentoring or teaching others', 'Rock climbing or kayaking'],
    },
    {
      question: 'What kind of impact do you want to have on the world?',
      options: ['To create something beautiful or meaningful', 'To innovate and solve problems', 'To make a positive difference in people\'s lives', 'To protect and preserve the environment'],
    },
    {
      question: 'What type of problem are you most drawn to solve?',
      options: ['Artistic or design-related challenges', 'Technical or logical puzzles', 'Social or interpersonal conflicts', 'Physical or endurance-based challenges'],
    },
    {
      question: 'What do you value most in a learning experience?',
      options: ['Creative expression and exploration', 'Critical thinking and problem-solving', 'Collaboration and community engagement', 'Hands-on experience and physical activity'],
    },
    {
      question: 'Which of these words best describes you?',
      options: ['Imaginative', 'Analytical', 'Empathetic', 'Adventurous'],
    },
  ];
  
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route
          path="/question/:questionNumber"
          element={<QuestionPage questions={questions} setAnswers={setAnswers} answers={answers} />}
        />
        <Route path="/end" element={<EndPage answers={answers} setResults={setResults} />} />
        <Route path="/results" element={<ResultsPage results={results} />} />
        <Route path="/stopwatch" element={<Stopwatch/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/tracker" element={<Tracker/>}/>
        {/* Add the new route with hobbyId parameter */}
        <Route path="/tracker/:hobbyId" element={<Tracker/>}/>
        <Route path="/addhobby" element={<AddHobby/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
      </Routes>
    </>
  );
}

export default App;