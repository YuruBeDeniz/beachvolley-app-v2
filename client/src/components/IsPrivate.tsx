import { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate } from 'react-router-dom';

type IsPrivateProps = {
    children: ReactNode;
}


export function IsPrivate({ children }: IsPrivateProps) {
  const { isLoggedIn } = useContext(AuthContext);

  console.log("from isPrivate, isLoggedIn:", isLoggedIn)


  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}