import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import Login from './Login';
import Signup from './Signup';

export default function Navbar() {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openSignupPopup, setOpenSignupPopup] = useState(false);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  const handleLoginPopup = () => {
    setOpenLoginPopup(true);
    setOpenSignupPopup(false);
  };

  const handleSignupPopup = () => {
    setOpenSignupPopup(true);
    setOpenLoginPopup(false);
  };

  const closePopup = () => {
    setOpenLoginPopup(false);
    setOpenSignupPopup(false);
  };

  return (
    <div>
      <nav className='flex justify-between items-center h-16 bg-gray-800 text-white px-5'>
        <h1 className='text-xl font-semibold'>Club Volley</h1>
        <div className='space-x-4'>
          <button onClick={isLoggedIn ? logoutUser : handleLoginPopup}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
          {!isLoggedIn && (
            <button onClick={handleSignupPopup}>Sign Up</button>
          )}
        </div>
      </nav>
      {(openLoginPopup || openSignupPopup) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closePopup}>
          <div className="bg-white p-8 rounded-lg max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            {openLoginPopup && <Login closePopup={closePopup} onSignupClick={handleSignupPopup} />}
            {openSignupPopup && <Signup onLoginClick={handleLoginPopup} />}
          </div>
        </div>
      )}
    </div>
  );
}
