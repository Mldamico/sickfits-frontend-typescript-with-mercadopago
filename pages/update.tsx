import React from 'react';
import { UpdateProduct } from '../components/UpdateProduct';

type UpdatePageProps = {
  query: {
    id: string;
  };
};

const UpdatePage = ({ query }: UpdatePageProps) => {
  return <UpdateProduct id={query.id} />;
};

export default UpdatePage;
