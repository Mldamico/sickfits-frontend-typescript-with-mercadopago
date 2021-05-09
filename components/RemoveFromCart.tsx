import React from 'react';
import {
  CartItem,
  useDeleteCartItemMutation,
} from '../types/generated-queries';
import styled from 'styled-components';
import { ApolloCache, Cache } from '@apollo/client';

const BigButton = styled.button`
  font-size: 3rem;
  border: 0;
  background: white;
  color: black;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

type UpdateFnPayloadProps = {
  data: {
    deleteCartItem: CartItem;
  };
};

function update(cache: ApolloCache<any>, payload: UpdateFnPayloadProps) {
  cache.evict(
    cache.identify(payload.data.deleteCartItem) as Cache.EvictOptions
  );
}

export const RemoveFromCart = ({ id }: { id: string }) => {
  const [deleteItem, { loading }] = useDeleteCartItemMutation({
    variables: { id },
    update,
  });

  const deleteItemHandler = async () => {
    await deleteItem();
  };
  return (
    <BigButton
      type='button'
      disabled={loading}
      title='Remove this item from Cart'
      onClick={deleteItemHandler}
    >
      &times;
    </BigButton>
  );
};
