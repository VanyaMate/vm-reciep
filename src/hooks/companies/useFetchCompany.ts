import { useContext, useEffect, useMemo, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Company } from '@/modules/api/company/company-service.types.ts';


export type UseFetchCompany = [ boolean, Company | null ];

export const useFetchCompany = function (companyId: string): UseFetchCompany {
    const { company: companyService } = useContext(ServicesContext);
    const [ loading, setLoading ]     = useState<boolean>(false);
    const [ company, setCompany ]     = useState<Company | null>(null);

    useEffect(() => {
        if (!companyId) {
            return;
        }

        setLoading(true);
        companyService
            .findOne(companyId)
            .then((company) => setCompany(company))
            .finally(() => setLoading(false));
    }, [ companyId ]);

    return useMemo(() => {
        return [ loading, company ];
    }, [ loading, company ]);
};