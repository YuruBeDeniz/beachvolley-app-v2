import axios from "axios";
import { useState, ChangeEvent, SyntheticEvent } from "react";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");  

  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const requestBody = {name, email, password }
    axios.post("/api/auth/signup", requestBody)
        .then(response => console.log(response))
        .catch(error => setError(error.response.data.message));
  }

  return (
    <div className="flex justify-center bg-slate-300">
      <form className="flex flex-col" onSubmit={handleSubmit}>  
        <label>Name</label>
        <input value={name} type="text" onChange={handleName} />
        <label>Email</label>
        <input value={email} type="email" onChange={handleEmail} />
        <label>Password</label>
        <input value={password} type="password" onChange={handlePassword} />
        <label>Confirm Password</label>
        <input value={confirmPassword} type="password" onChange={handleConfirmPassword} />
        {password === confirmPassword 
         ? <button>Signup</button>
         : <h3>Passwords don't match</h3>
        }
      </form>
      {error && <h3 className="text-red-600 text-lg">{error}</h3>}
    </div>
  )
}
