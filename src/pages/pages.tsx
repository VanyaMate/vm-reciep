import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.tsx';
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.tsx';
import HomePage from '@/pages/client/HomePage.tsx';
import ProductPage from '@/pages/client/ProductPage.tsx';
import { PageType } from '@/pages/getPage.ts';
import CartPage from '@/pages/client/CartPage.tsx';
import ProductsPage from '@/pages/client/ProductsPage.tsx';
import BrandPage from '@/pages/client/BrandPage.tsx';
import CompanyPage from '@/pages/client/CompanyPage.tsx';


const Pages = () => {
    return (
        <Routes>
            <Route path={ 'admin' } element={ <AdminLayout/> }>

            </Route>
            <Route path={ '/company/*' }
                   element={ <CommonLayout banner={ 'hide' }/> }>
                <Route path={ ':id' } element={ <CompanyPage/> }/>
                <Route path={ '*' } element={ '404' }/>
            </Route>
            <Route path={ '/brand/*' }
                   element={ <CommonLayout banner={ 'hide' }/> }>
                <Route path={ ':id' } element={ <BrandPage/> }/>
                <Route path={ '*' } element={ '404' }/>
            </Route>
            <Route path={ '/*' }
                   element={ <CommonLayout banner={ 'small' }/> }>
                <Route path={ PageType.PRODUCTS } element={ <ProductsPage/> }/>
                <Route path={ `${ PageType.PRODUCT }/:id` }
                       element={ <ProductPage/> }/>
                <Route path={ `${ PageType.CART }` } element={ <CartPage/> }/>
            </Route>
            <Route path={ '*' } element={ <CommonLayout/> }>
                <Route path={ '/*' } element={ <HomePage/> }/>
                <Route path={ '*' } element={ '404' }/>
            </Route>d
        </Routes>
    );
};

export default React.memo(Pages);