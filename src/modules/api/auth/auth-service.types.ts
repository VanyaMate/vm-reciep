import { CartItem } from '@/modules/api/cart/cart-service.types.ts';
import { User } from '@/modules/api/user/user-service.types.ts';


export type AuthData = {
    user: User,
    cart: CartItem[],
}