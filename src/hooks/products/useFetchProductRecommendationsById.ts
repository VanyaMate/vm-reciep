import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { Options } from '@/modules/api.types.ts';


export type UseFetchProductRecommendations = {
    products: Product[];
    by: string;
    loading: boolean;
}

export const useFetchProductRecommendationsById = function (options: Options<Product>, productId?: string, wait?: boolean): UseFetchProductRecommendations {
    const { products: productsService } = useContext(ServicesContext);
    const [ products, setProducts ]     = useState<Product[]>([]);
    const [ loading, setLoading ]       = useState<boolean>(true);
    const [ by, setBy ]                 = useState<string>('');

    useEffect(() => {
        setLoading(true);
        setBy('');

        if (wait) {
            return;
        }

        if (productId) {
            productsService
                .findOne(productId)
                .then((product) => {
                    if (product) {
                        const firstWord: string = product.product_name.split(' ')[0];
                        setBy(firstWord);
                        return productsService
                            .findMany((product) => !!product.product_name.match(firstWord), options)
                            .then((response) => setProducts(response.list));
                    }
                })
                .finally(() => setLoading(false));
        } else {
            productsService
                .findMany({}, options)
                .then((response) => setProducts(response.list))
                .finally(() => setLoading(false));
        }
    }, [ productId, wait ]);

    return {
        products, loading, by,
    };
};