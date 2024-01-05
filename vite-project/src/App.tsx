import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import Home from '../src/components/Home/Home';
import DogCards from './components/Search/DogCards';

const App: React.FC = () => {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  useEffect(() => {
    localStorage.setItem('isLoggedIn', 'false');
  }, [loggedIn]);

  // Render a loading state while checking authentication
  if (loggedIn === null) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dogs" element={<DogCards loggedIn={loggedIn} />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;