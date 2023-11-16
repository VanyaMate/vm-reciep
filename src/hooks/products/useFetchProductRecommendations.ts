import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Product } from '@/modules/api/product/product-service.types.ts';


export type UseFetchProductRecommendations = {
    products: Product[];
    loading: boolean;
}

export const useFetchProductRecommendations = function (productId: string): UseFetchProductRecommendations {
    const { products: productsService } = useContext(ServicesContext);
    const [ products, setProducts ]     = useState<Product[]>([]);
    const [ loading, setLoading ]       = useState<boolean>(true);


    useEffect(() => {
        setLoading(true);

        productsService
            .findMany((product) => product.barcode.toString()[1] === productId[1], { limit: 10 })
            .then((response) => setProducts(response.list))
            .finally(() => setLoading(false));
    }, [ productId ]);

    return {
        products, loading,
    };
};