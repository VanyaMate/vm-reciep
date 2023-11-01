import { CartItem } from '@/modules/local-backend/cart/cart-backend.types.ts';
import { PublicUser } from '@/modules/local-backend/user/user-backend.types.ts';


export type AuthData = {
    user: PublicUser,
    cart: CartItem[],
}