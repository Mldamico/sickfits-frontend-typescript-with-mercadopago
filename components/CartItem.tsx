import React from 'react';
import styled from 'styled-components';
import {
  CartItem as CartItemType,
  useDeleteCartItemMutation,
} from '../types/generated-queries';
import formatMoney from '../lib/formatMoney';
import { format } from 'prettier';
import { RemoveFromCart } from './RemoveFromCart';
const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

type CartItemProps = { cartItem: CartItemType };

export const CartItemComponent = ({ cartItem }: CartItemProps) => {
  if (!cartItem.product) return null;

  return (
    <CartItemStyles>
      <img
        width='100'
        src={cartItem.product.photo.image.publicUrlTransformed}
        alt={cartItem.product.name}
      />
      <div>
        <h3>{cartItem.product.name}</h3>
        <p>
          {formatMoney(cartItem.product.price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.product.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};
