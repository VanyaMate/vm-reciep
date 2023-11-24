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
import {
    LocalAuthService,
} from '@/modules/api/auth/services/local-auth-service.ts';
import { UserBackend } from '@/modules/local-backend/user/user-backend.ts';
import {
    UserBackendMapper,
} from '@/modules/local-backend/user/user-backend.mapper.ts';
import { CartBackend } from '@/modules/local-backend/cart/cart-backend.ts';
import {
    WishlistBackend,
} from '@/modules/local-backend/wishlist/wishlist-backend.ts';
import { StorageService } from '@vanyamate/market-place-service';
import {
    LocalProductsService,
} from '@/modules/api/products/services/local-products-service.ts';
import {
    LocalCartService,
} from '@/modules/api/cart/services/local-cart-service.ts';
import {
    ProductsBackend,
} from '@/modules/local-backend/products/products-backend.ts';
import {
    LocalWishlistService,
} from '@/modules/api/wishlist/services/local-wishlist.service.ts';
import {
    ICategoriesService,
} from '@/modules/api/categories/categories-service.interface.ts';
import { Category } from '@/modules/api/category/category-service.types.ts';
import {
    LocalCategoriesService,
} from '@/modules/api/categories/services/local-categories-service.ts';
import {
    CategoriesBackend,
} from '@/modules/local-backend/categories/categories-backend.ts';


export type ServicesContextType = {
    auth: IAuthService<AuthData>,
    products: IProductsService<Product>,
    cart: ICartService<Cart>,
    wishlist: IWishlistService<Wishlist>,
    categories: ICategoriesService<Category>,
}

export const ServicesContext = createContext<ServicesContextType>({
    auth      : new LocalAuthService(
        new UserBackend(),
        new UserBackendMapper(),
        new CartBackend(),
        new WishlistBackend(),
        new StorageService(localStorage, 'auth'),
        new StorageService(sessionStorage, 'auth'),
    ),
    products  : new LocalProductsService(new ProductsBackend()),
    cart      : new LocalCartService('', new CartBackend()),
    wishlist  : new LocalWishlistService('', new WishlistBackend()),
    categories: new LocalCategoriesService(new CategoriesBackend()),
});