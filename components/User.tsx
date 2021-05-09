import React from 'react';
import { useCurrentUserQuery } from '../types/generated-queries';

export const useUser = () => {
  const { data, error, loading } = useCurrentUserQuery();
  return data?.authenticatedItem;
};
