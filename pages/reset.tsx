import React from 'react';
import { RequestReset } from '../components/RequestReset';
import { Reset } from '../components/Reset';

const ResetPage = ({ query }: { query: { token: string } }) => {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
};

export default ResetPage;
