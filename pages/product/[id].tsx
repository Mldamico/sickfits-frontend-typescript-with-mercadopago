import React from 'react';
import { useFindProductByIdQuery } from '../../types/generated-queries';
import { SingleProduct } from '../../components/SingleProduct';

type SingleProductProps = {
  query: {
    id: string;
  };
};

function SingleProductPage({ query }: SingleProductProps) {
  const { id } = query;
  
  return <SingleProduct id={id} />;
}

export default SingleProductPage;
