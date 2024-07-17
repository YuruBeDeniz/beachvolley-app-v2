import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

type LoginPopupProps = {
    closePopup: () => void;
    onSignupClick: () => void;
}

export default function Login({ closePopup, onSignupClick }: LoginPopupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { storeToken, verifyStoredToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios.post("/api/auth/login", requestBody)
        .then(response => {
            const token = response.data.authToken;
            storeToken(token);
            verifyStoredToken();
            navigate("/profile");
            console.log("Login successful");
            closePopup();
        })
        .catch(err =>{ 
          setError(err.response.data.message)
          console.error("Login failed:", err.response.data.message); 
        });
  }

  return (
    <div className='flex flex-col space-y-4 bg-orange-100 p-4 rounded-lg'>
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type='email' value={email} onChange={handleEmail} className="border px-2 py-1 rounded" />
        <label htmlFor="password">Password</label>
        <input type='password' value={password} onChange={handlePassword} className="border px-2 py-1 rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
      </form>
      {error && <h3 className="text-red-500">{error}</h3>}
      <p>Don't you have an account? <span className="text-blue-500 cursor-pointer" onClick={onSignupClick}>Signup</span></p>
    </div>
  )
}
