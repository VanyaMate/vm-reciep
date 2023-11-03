import { createContext } from 'react';
import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import {
    IProductsService,
} from '@/modules/api/products/products-service.interface.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { ICartService } from '@/modules/api/cart/cart-service.interface.ts';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import {
    IWishlistService,
} from '@/modules/api/wishlist/wishlist-service.interface.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';


export type ServicesContextType = {
    auth: IAuthService<AuthData>,
    products: IProductsService<Product>,
    cart: ICartService<Cart>,
    wishlist: IWishlistService<Wishlist>,
}

export const ServicesContext = createContext<ServicesContextType | null>(null);