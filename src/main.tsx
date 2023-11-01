import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { LocalAuthService } from '@/modules/api/auth/services/local-auth-service.ts';
import { ICartService } from '@/modules/api/cart/cart-service.interface.ts';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import { LocalCartService } from '@/modules/api/cart/services/local-cart-service.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { IProductsService } from '@/modules/api/products/products-service.interface.ts';
import { LocalProductsService } from '@/modules/api/products/services/local-products-service.ts';
import { LocalWishlistService } from '@/modules/api/wishlist/services/local-wishlist.service.ts';
import { IWishlistService } from '@/modules/api/wishlist/wishlist-service.interface.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import { CartBackend } from '@/modules/local-backend/cart/cart-backend.ts';
import { ProductsBackend } from '@/modules/local-backend/products/products-backend.ts';
import { UserBackendMapper } from '@/modules/local-backend/user/user-backend.mapper.ts';
import { UserBackend } from '@/modules/local-backend/user/user-backend.ts';
import { WishlistBackend } from '@/modules/local-backend/wishlist/wishlist-backend.ts';
import { StorageService } from '@vanyamate/market-place-service';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
);

const authService: IAuthService<AuthData> = new LocalAuthService(
    new UserBackend(),
    new UserBackendMapper(),
    new CartBackend(),
    new WishlistBackend(),
    new StorageService(
        localStorage,
        'auth',
    ),
    new StorageService(
        sessionStorage,
        'auth',
    ),
);

const productsService: IProductsService<Product> = new LocalProductsService(new ProductsBackend());

authService
    .registration('admin', '123', false)
    .then((data) => console.log('Вход в аккаунт:', data))
    .catch((error) => console.error('Ошибка авторизации:', error));

//authService.logout();

authService
    .login('admin', '123')
    .then((data) => console.log('Вход в аккаунт:', data))
    .catch((error) => console.error('Ошибка авторизации:', error));

authService
    .refresh()
    .then((data) => console.log('Вход в аккаунт:', data))
    .catch((error) => console.error('Ошибка авторизации:', error));

authService
    .refresh()
    .then((data) => {
        const cartService: ICartService<Cart> = new LocalCartService(
            data.user.login,
            new CartBackend(),
        );

        const wishlistService: IWishlistService<Wishlist> = new LocalWishlistService(
            data.user.login,
            new WishlistBackend(),
        );

        wishlistService
            .addToWishlist('1')
            .then((wishlist) => console.log('Обновленный список избранного:', wishlist));

        cartService
            .addToCart('1', 1)
            .then((cart) => console.log('Обновленная корзина:', cart));
    });

productsService
    .findMany((product) => product.calories > 900, { limit: 10, sort: [ 'calories', 'asc' ] })
    .then((response) => {
        console.log('Количество продуктов:', response.count);
        console.log('Список продуктов:', response.list);
    });
