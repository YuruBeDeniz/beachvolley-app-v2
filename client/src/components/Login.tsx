import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export default function Login() {
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
            navigate("/");
            console.log("Login successful");
        })
        .catch(err =>{ 
          setError(err.response.data.message)
          console.error("Login failed:", err.response.data.message); 
        });
  }

  return (
    <div className='flex justify-center mt-6 bg-orange-100'>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type='email' value={email} onChange={handleEmail} />
        <label htmlFor="password">Password</label>
        <input type='password' value={password} onChange={handlePassword} />
        <button>Login</button>
      </form>
      {error && <h3>{error}</h3>}
    </div>
  )
}
