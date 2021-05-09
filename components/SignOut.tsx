import React from 'react';
import {
  refetchCurrentUserQuery,
  useSignOutMutation,
} from '../types/generated-queries';

export const SignOut = () => {
  const [signOut] = useSignOutMutation({
    refetchQueries: [refetchCurrentUserQuery()],
  });

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <button type='button' onClick={handleSignOut}>
      Sign Out
    </button>
  );
};
