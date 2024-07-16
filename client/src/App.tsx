import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Signup />
      <Login />
    </div>
  );
}

export default App;
