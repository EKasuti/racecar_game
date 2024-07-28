import React,{ useState }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Game from './components/Game';
import Login from './components/Login';
import UserProfile from './Pages/UserProfile';



function App() {
    const [account, setAccount] = useState(null);
    const [userNFT, setUserNFT] = useState(null);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setAccount={setAccount} setUserNFT={setUserNFT} />} />
        <Route path="/game" element={<Game />} />
        <Route path="/user"  element={<UserProfile account={account} userNFT={userNFT} />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;