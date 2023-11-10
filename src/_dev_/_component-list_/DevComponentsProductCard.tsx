import React, { useMemo } from 'react';
import DevComponentsItem from '@/_dev_/DevComponentsItem/DevComponentsItem.tsx';
import {
    ProductBackendDataGenerator,
} from '@/modules/local-backend/product/product-backend.data-generator.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { IDataGenerator } from '@vanyamate/market-place-service';
import {
    CreateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';
import ProductList
    from '@/components/_common/_content/_product/ProductList/ProductList.tsx';


const DevComponentsProductCard = () => {
    const productGenerator: IDataGenerator<Product, CreateProductDto> = useMemo(() => {
        return new ProductBackendDataGenerator();
    }, []);

    const products: Product[] = useMemo(() => {
        const list: Product[] = [];
        for (let i = 0; i < 5; i++) {
            list.push(productGenerator.filled());
        }
        return list;
    }, []);

    return (
        <DevComponentsItem
            label={ 'Product Card' }
            type={ 'row' }
        >
            <ProductList products={ products }/>
        </DevComponentsItem>
    );
};

export default React.memo(DevComponentsProductCard);