import React from 'react';
import ProductPageContainer
    from '@/containers/_product/ProductPageContainer/ProductPageContainer.tsx';
import ProductListContainer
    from '@/containers/_product/ProductListContainer/ProductListContainer.tsx';


export type ProductsPageProps = {}

const ProductsPage: React.FC<ProductsPageProps> = (props) => {
    const {} = props;

    return (
        <div>
            <ProductListContainer/>
        </div>
    );
};

export default React.memo(ProductsPage);