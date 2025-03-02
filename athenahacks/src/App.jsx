import './App.css';
import StartPage from './components/StartPage.tsx';
import WelcomePage from './components/WelcomePage.jsx';
import QuestionPage from './components/QuestionPage.jsx';
import DiscoveryQuiz from './components/DiscoveryQuiz.jsx';
import ResultsPage from './components/ResultsPage';
import EndPage from './components/EndPage';
import Stopwatch from './components/Stopwatch';
import {Routes, Route} from 'react-router-dom';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/welcomepage" element={<WelcomePage/>}/>
        <Route path="/questionpage" element={<QuestionPage/>}/>
        <Route path="/discoveryquiz" element={<DiscoveryQuiz/>}/>
        <Route path="/resultspage" element={<ResultsPage/>}/>
        <Route path="/endpage" element={<EndPage/>}/>
        <Route path="/stopwatch" element={<Stopwatch/>}/>
      </Routes>
    </>
  );
}

export default App;
