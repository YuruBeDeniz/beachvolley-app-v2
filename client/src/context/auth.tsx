import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types/types';


type AuthContextType  = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserType | null;
  storeToken: (token: string) => void;
  verifyStoredToken: () => void;
  logoutUser: () => void;
};

export const AuthContextDefaults: AuthContextType  = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  storeToken: (token: string) => null,
  verifyStoredToken: () => null,
  logoutUser: () => null,
}

const AuthContext = createContext<AuthContextType>(AuthContextDefaults);

type AuthProviderWrapperProps = {
  children: ReactNode; 
}

const AuthProviderWrapper: FC<AuthProviderWrapperProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  const storeToken = (token: string) => localStorage.setItem("authToken", token);

  const verifyStoredToken = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      return axios
        .get("/api/auth/verify", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          const user: UserType = response.data; 
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setUser(null);
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    verifyStoredToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, verifyStoredToken, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProviderWrapper, AuthContext };