import { createContext } from 'react';
import { IUserEntity, UserEntity } from '@/entities/user/UserEntity.ts';
import { CartEntity, ICartEntity } from '@/entities/cart/CartEntity.ts';
import {
    IWishlistEntity,
    WishlistEntity,
} from '@/entities/wishlist/CartEntity.ts';
import { AuthEntity, IAuthEntity } from '@/entities/auth/AuthEntity.ts';


export type EntitiesContextType = {
    auth: IAuthEntity,
    user: IUserEntity,
    cart: ICartEntity,
    wishlist: IWishlistEntity,
}

export const EntitiesContext = createContext({
    auth    : new AuthEntity(),
    user    : new UserEntity(),
    cart    : new CartEntity(),
    wishlist: new WishlistEntity(),
});