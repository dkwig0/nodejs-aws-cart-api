import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart | null): number {
  try {
    return cart ? cart.items.reduce((acc: number, { product: { price }, count }: CartItem) => {
      return acc += price * count;
    }, 0) : 0;
  } catch (e) {
    return 0
  }
}
