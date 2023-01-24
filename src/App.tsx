import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import HomePage from './Pages/Home/HomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/Home' element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
