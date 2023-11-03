import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductList
    from '@/components/_common/_content/_product/ProductList/ProductList.tsx';
import { ServicesContext } from '@/contexts/ServicesContext.tsx';


const ProductListContainer = () => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const services                  = useContext(ServicesContext);

    useEffect(() => {
        services?.products
            .findMany({ available: true }, { limit: 30 })
            .then((response) => setProducts(response.list));
    }, []);

    return (
        <ProductList products={ products }/>
    );
};

export default ProductListContainer;