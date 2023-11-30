import React, { useMemo } from 'react';
import DevComponentsItem from '@/_dev_/DevComponentsItem/DevComponentsItem.tsx';
import CartItems from '@/components/_cart/CartPreOrderBox/CartPreOrderBox.tsx';
import { IDataGenerator } from '@vanyamate/market-place-service';
import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    CreateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';
import {
    ProductBackendDataGenerator,
} from '@/modules/local-backend/product/product-backend.data-generator.ts';


export type DevComponentsCartListProps = {}

const DevComponentsCartList: React.FC<DevComponentsCartListProps> = (props) => {
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
        <DevComponentsItem label={ 'Cart List' } type={ 'col' }>
            <CartItems
                products={ [
                    {
                        product: productGenerator.filled(),
                        amount : 1,
                    },
                    {
                        product: productGenerator.filled(),
                        amount : 3,
                    },
                    {
                        product: productGenerator.filled(),
                        amount : 4,
                    },
                ] }
                onAmountChange={ mockAsync }
            />
        </DevComponentsItem>
    );
};

export default React.memo(DevComponentsCartList);