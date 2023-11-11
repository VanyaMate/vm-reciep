import React, { useCallback, useMemo } from 'react';
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
import ProductCard
    from '@/components/_common/_content/_product/ProductCard/ProductCard.tsx';
import { getRandomInt } from '@/helpers/random.ts';


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

    const onAddAny = useCallback(async () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }, []);

    return (
        <DevComponentsItem
            label={ 'Product Card' }
            type={ 'row' }
        >
            <ProductList>
                {
                    products.map((product) => {
                        return (
                            <ProductCard
                                key={ product.barcode }
                                product={ product }
                                onAddToCart={ onAddAny }
                                onAddToWishlist={ onAddAny }
                                inWishlist={!!getRandomInt(0, 2)}
                                inCart={getRandomInt(0, 2) * getRandomInt(0, 2) * getRandomInt(1, 10)}
                            />
                        );
                    })
                }
            </ProductList>
        </DevComponentsItem>
    );
};

export default React.memo(DevComponentsProductCard);