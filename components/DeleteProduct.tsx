import { ApolloCache, Cache } from '@apollo/client';
import React from 'react';
import { Product, useDeleteProductMutation } from '../types/generated-queries';

type DeleteProductProps = {
  id: string;
  children: JSX.Element | JSX.Element[] | string;
};

type UpdateFnPayloadProps = {
  data: {
    deleteProduct: Product;
  };
};
const update = (cache: ApolloCache<any>, payload: UpdateFnPayloadProps) => {
  cache.evict(cache.identify(payload.data.deleteProduct) as Cache.EvictOptions);
};

export const DeleteProduct = ({ id, children }: DeleteProductProps) => {
  const [deleteProduct, { loading }] = useDeleteProductMutation({
    variables: { id },
    update: update,
  });
  return (
    <button
      type='button'
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
};
