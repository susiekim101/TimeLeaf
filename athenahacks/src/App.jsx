import './App.css';
import StartPage from './components/StartPage.tsx';
import {Routes, Route} from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
      </Routes>
    </>
  );
}

export default App;
