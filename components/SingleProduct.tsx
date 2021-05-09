import Head from 'next/head';
import React from 'react';
import { useFindProductByIdQuery } from '../types/generated-queries';
import DisplayError from './ErrorMessage';
import styled from 'styled-components';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const SingleProduct = ({ id }) => {
  const { data, error, loading } = useFindProductByIdQuery({
    variables: { id },
  });
  if (error) return <DisplayError error={error} />;
  if (loading) return <p>Loading...</p>;
  const { Product: product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {product.name}</title>
      </Head>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div className='details'>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
};
