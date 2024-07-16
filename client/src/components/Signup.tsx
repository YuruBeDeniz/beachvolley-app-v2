import axios from "axios";
import { useState, ChangeEvent, SyntheticEvent } from "react";

type SignupPopupProps = {
  onLoginClick: () => void;
}

export default function Signup({ onLoginClick }: SignupPopupProps) {
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
    <div className="flex flex-col space-y-4 bg-slate-300 p-4 rounded-lg">
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={name} type="text" onChange={handleName} className="border px-2 py-1 rounded" />
        <label>Email</label>
        <input value={email} type="email" onChange={handleEmail} className="border px-2 py-1 rounded" />
        <label>Password</label>
        <input value={password} type="password" onChange={handlePassword} className="border px-2 py-1 rounded" />
        <label>Confirm Password</label>
        <input value={confirmPassword} type="password" onChange={handleConfirmPassword} className="border px-2 py-1 rounded" />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Signup
        </button>
      </form>
      {error && <h3 className="text-red-600">{error}</h3>}
      {password !== confirmPassword && <h3>Passwords don't match</h3>}
      <span className="text-blue-500 cursor-pointer" onClick={onLoginClick}>Go to login!</span>
    </div>
  )
}
