import React from 'react';
import {
  useAddToCartMutation,
  refetchCurrentUserQuery,
} from '../types/generated-queries';

export const AddToCart = ({ id }: { id: string }) => {
  const [addToCart, { loading }] = useAddToCartMutation({
    variables: { id },
    refetchQueries: [refetchCurrentUserQuery()],
  });

  const handleAddToCart = async () => {
    await addToCart();
  };

  return (
    <button type='button' disabled={loading} onClick={handleAddToCart}>
      Add{loading && 'ing'} To Cart
    </button>
  );
};
