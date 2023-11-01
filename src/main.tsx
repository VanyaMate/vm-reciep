import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { LocalAuthService } from '@/modules/api/auth/services/local-auth-service.ts';
import { ICartService } from '@/modules/api/cart/cart-service.interface.ts';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import { LocalCartService } from '@/modules/api/cart/services/local-cart-service.ts';
import { CartBackend } from '@/modules/local-backend/cart/cart-backend.ts';
import { UserBackendMapper } from '@/modules/local-backend/user/user-backend.mapper.ts';
import { UserBackend } from '@/modules/local-backend/user/user-backend.ts';
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
    new StorageService(
        localStorage,
        'auth',
    ),
    new StorageService(
        sessionStorage,
        'auth',
    ),
);

authService.registration('admin', '123', false)
    .then((data) => console.log('Вход в аккаунт:', data))
    .catch((error) => console.error('Ошибка авторизации:', error));

//authService.logout();

authService.login('admin', '123')
    .then((data) => console.log('Вход в аккаунт:', data))
    .catch((error) => console.error('Ошибка авторизации:', error));

authService.refresh()
    .then((data) => console.log('Вход в аккаунт:', data))
    .catch((error) => console.error('Ошибка авторизации:', error));

authService.refresh()
    .then((data) => {
        const cartService: ICartService<Cart> = new LocalCartService(
            data.user.login,
            new CartBackend(),
        );

        cartService.addToCart('1', 1)
            .then((cart) => console.log('Обновленная корзина:', cart));
    });