import { CartItem } from '@/modules/api/cart/cart-service.types.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';


export type AuthData = {
    user: User,
    cart: CartItem[],
    wishlist: Wishlist,
}