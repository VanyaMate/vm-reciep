import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { LocalAuthService } from '@/modules/api/auth/services/local-auth-service.ts';
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
    .then((user) => console.log('loginned', user))
    .catch((error) => console.error('Ошибка авторизации:', error));

//authService.logout();

authService.login('admin', '123')
    .then((user) => console.log('loginned', user))
    .catch((error) => console.error('Ошибка авторизации:', error));
