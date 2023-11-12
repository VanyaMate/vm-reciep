import React, { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductView
    from '@/components/_common/_content/_product/ProductView/ProductView.tsx';


export type ProductPageContainerProps = {
    productId: string;
}

const ProductPageContainer: React.FC<ProductPageContainerProps> = (props) => {
    const { productId }           = props;
    const { products }            = useContext(ServicesContext);
    const [ product, setProduct ] = useState<Product | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        products
            .findOne(productId)
            .then((product) => setProduct(product))
            .finally(() => setLoading(false));
    }, [ productId ]);

    if (loading) {
        return 'skeleton';
    }

    if (!product) {
        return 404;
    }

    return (
        <ProductView product={ product }/>
    );
};

export default ProductPageContainer;