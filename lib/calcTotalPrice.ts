import { CartItem } from '../types/generated-queries';

export default function calcTotalPrice(cart: CartItem[]): number {
  return cart.reduce((tally: number, cartItem: CartItem) => {
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
