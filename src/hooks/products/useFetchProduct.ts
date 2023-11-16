import { useContext, useEffect, useState } from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';


export type UseFetchProduct = {
    product: Product | null;
    loading: boolean;
}

export const useFetchProduct = function (productId: string): UseFetchProduct {
    const { products }            = useContext(ServicesContext);
    const [ product, setProduct ] = useState<Product | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        products
            .findOne(productId)
            .then((product) => setProduct(product))
            .finally(() => setLoading(false));
    }, [ productId ]);

    return {
        product, loading,
    };
};