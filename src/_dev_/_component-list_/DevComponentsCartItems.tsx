import React, { useMemo } from 'react';
import DevComponentsItem from '@/_dev_/DevComponentsItem/DevComponentsItem.tsx';
import ProductCartItem
    from '@/components/_product/ProductCart/ProductCartItem/ProductCartItem.tsx';
import { IDataGenerator } from '@vanyamate/market-place-service';
import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    CreateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';
import {
    ProductBackendDataGenerator,
} from '@/modules/local-backend/product/product-backend.data-generator.ts';


export type DevComponentsCartItemsProps = {}

const DevComponentsCartItems: React.FC<DevComponentsCartItemsProps> = (props) => {
    const {}                                                          = props;
    const productGenerator: IDataGenerator<Product, CreateProductDto> = useMemo(() => {
        return new ProductBackendDataGenerator();
    }, []);

    const mockAsync = function () {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    return (
        <DevComponentsItem label={ 'Product Cart Item' } type={ 'col' }>
            <ProductCartItem
                product={ productGenerator.filled() }
                url={ '#' }
                amount={ 1 }
                onAmountChange={ mockAsync }
            />
            <ProductCartItem
                product={ productGenerator.filled() }
                url={ '#' }
                amount={ 3 }
                onAmountChange={ mockAsync }
            />
            <ProductCartItem
                product={ productGenerator.filled() }
                url={ '#' }
                amount={ 5 }
                onAmountChange={ mockAsync }
            />
        </DevComponentsItem>
    );
};

export default React.memo(DevComponentsCartItems);