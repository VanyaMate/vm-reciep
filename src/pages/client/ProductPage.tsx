import React from 'react';
import { useParams } from 'react-router-dom';
import ProductPageContainer
    from '@/containers/_product/ProductPageContainer/ProductPageContainer.tsx';


const ProductPage = () => {
    const params = useParams<{ id: string }>();

    return (
        <ProductPageContainer productId={ params.id ?? '0' }/>
    );
};

export default ProductPage;