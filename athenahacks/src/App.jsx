import './App.css';
import StartPage from './components/StartPage.tsx';
import WelcomePage from './components/WelcomePage.jsx';
import QuestionPage from './components/QuestionPage.jsx';
import DiscoveryQuiz from './components/DiscoveryQuiz.jsx';
import HomePage from './components/HomePage.jsx';
import ResultsPage from './components/ResultsPage';
import EndPage from './components/EndPage';
import AddHobby from './components/AddHobby.jsx';
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
        <Route path="/addhobby" element={<AddHobby/>}/>
        <Route path="/resultspage" element={<ResultsPage/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/endpage" element={<EndPage/>}/>
        
      </Routes>
    </>
  );
}

export default App;
