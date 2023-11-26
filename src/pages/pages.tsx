import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.tsx';
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.tsx';
import HomePage from '@/pages/client/HomePage.tsx';
import ProductPage from '@/pages/client/ProductPage.tsx';
import { PageType } from '@/pages/getPage.ts';


const Pages = () => {
    return (
        <Routes>
            <Route path={ 'admin' } element={ <AdminLayout/> }>

            </Route>
            <Route path={ '/*' } element={ <CommonLayout smallBanner/> }>
                <Route path={ PageType.PRODUCTS } element={ <HomePage/> }/>
                <Route path={ `${ PageType.PRODUCT }/:id` }
                       element={ <ProductPage/> }/>
            </Route>
            <Route path={ '*' } element={ <CommonLayout/> }>
                <Route path={ '/*' } element={ <HomePage/> }/>
                <Route path={ '*' } element={ '404' }/>
            </Route>
        </Routes>
    );
};

export default React.memo(Pages);