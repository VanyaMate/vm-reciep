import { useContext, useEffect, useMemo, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Brand } from '@/modules/api/brand/brand-service.types.ts';


export type UseFetchBrand = [ boolean, Brand | null ];

export const useFetchBrand = function (brandId: string): UseFetchBrand {
    const { brand: brandService } = useContext(ServicesContext);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ brand, setBrand ]     = useState<Brand | null>(null);

    useEffect(() => {
        if (!brandId) {
            return;
        }

        setLoading(true);
        brandService
            .findOne(brandId)
            .then((brand) => setBrand(brand))
            .finally(() => setLoading(false));
    }, [ brandId ]);

    return useMemo(() => {
        return [ loading, brand ];
    }, [ loading, brand ]);
};