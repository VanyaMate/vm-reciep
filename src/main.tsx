import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ServicesProvider from '@/providers/ServicesProvider.tsx';
import UserProvider from '@/providers/UserProvider.tsx';
import CartProvider from '@/providers/CartProvider.tsx';
import WishlistProvider from '@/providers/WishlistProvider.tsx';
import AuthProvider from '@/providers/AuthProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <CartProvider>
                        <WishlistProvider>
                            <ServicesProvider>
                                <App/>
                            </ServicesProvider>
                        </WishlistProvider>
                    </CartProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
