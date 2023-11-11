import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.tsx';
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.tsx';
import ProductListContainer
    from '@/containers/_common/_product/ProductListContainer/ProductListContainer.tsx';


const Pages = () => {
    return (
        <Routes>
            <Route path={ 'admin' } element={ <AdminLayout/> }>

            </Route>
            <Route path={ '*' } element={ <CommonLayout/> }>
                <Route path={ 'categories' }>
                    <Route path={ ':id' } element={ 'category id' }/>
                    <Route path={ '*' } element={ 'category list' }/>
                </Route>
                <Route path={ 'product/:id' } element={ 'product' }/>
                <Route path={ '/*' } element={ <ProductListContainer/> }/>
                <Route path={ '*' } element={ '404' }/>
            </Route>
        </Routes>
    );
};

export default React.memo(Pages);