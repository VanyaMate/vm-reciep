import { Cart } from '@/modules/api/cart/cart-service.types.ts';


export type CreateCartDto = Pick<Cart, 'userId'>;
export type UpdateCartDto = Pick<Cart, 'items'>;