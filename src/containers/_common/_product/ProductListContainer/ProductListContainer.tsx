import React, { useEffect, useMemo, useState } from 'react';
import {
    IProductsService,
} from '@/modules/api/products/products-service.interface.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    LocalProductsService,
} from '@/modules/api/products/services/local-products-service.ts';
import {
    ProductsBackend,
} from '@/modules/local-backend/products/products-backend.ts';
import ProductList
    from '@/components/_common/_content/_product/ProductList/ProductList.tsx';


const ProductListContainer = () => {
    const [ products, setProducts ]                  = useState<Product[]>([]);
    const productsService: IProductsService<Product> = useMemo(() => new LocalProductsService(new ProductsBackend()), []);

    useEffect(() => {
        productsService
            .findMany({ available: true }, { limit: 30 })
            .then((response) => {
                console.log(response);
                setProducts(response.list);
            });
    }, []);

    return (
        <ProductList products={ products }/>
    );
};

export default ProductListContainer;