import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Events from './pages/Events';
import { IsPrivate } from './components/IsPrivate';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
              <Profile />
          }
        />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
