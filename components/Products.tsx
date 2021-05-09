import React from 'react';
import {
  useAllProductsQuery,
  useProductsPerPageQuery,
} from '../types/generated-queries';
import { Product } from './Product';
import styled from 'styled-components';
import { perPage } from '../config';

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export const Products = ({ page }: { page: number }) => {
  const { data, error, loading } = useProductsPerPageQuery({
    variables: { skip: page * perPage - perPage, first: perPage },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <ProductListStyles>
        {data?.allProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductListStyles>
    </div>
  );
};
