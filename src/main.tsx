import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '@/providers/AuthProvider.tsx';
import ServicesProvider from '@/providers/ServicesProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ServicesProvider>
                    <App/>
                </ServicesProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
