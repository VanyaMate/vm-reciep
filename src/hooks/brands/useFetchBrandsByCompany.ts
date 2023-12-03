import { Brand } from '@/modules/api/brand/brand-service.types.ts';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';


export type UseFetchBrandsByCompany = [ boolean, Brand[] ];

export const useFetchBrandsByCompany = function (companyId: string): UseFetchBrandsByCompany {
    const { brand: brandService } = useContext(ServicesContext);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ brands, setBrands ]   = useState<Brand[]>([]);

    useEffect(() => {
        if (!companyId) {
            return;
        }

        setLoading(true);
        brandService
            .findMany({ company: companyId }, { limit: 100 })
            .then((response) => response.list)
            .then((brands) => setBrands(brands))
            .finally(() => setLoading(false));
    }, [ companyId ]);

    return useMemo(() => {
        return [ loading, brands ];
    }, [ loading, brands ]);
};