import React from 'react';
import { SignIn } from './SignIn';
import { useUser } from './User';

export const PleaseSignIn = ({ children }) => {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
};
