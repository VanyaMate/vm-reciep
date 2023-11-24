import { useContext, useEffect, useMemo, useState } from 'react';
import { Category } from '@/modules/api/category/category-service.types.ts';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';


export type UseFetchCategories = {
    categories: Category[];
    loading: boolean;
}

export const useFetchCategories = function (): UseFetchCategories {
    const [ categories, setCategories ]     = useState<Category[]>([]);
    const [ loading, setLoading ]           = useState<boolean>(true);
    const { categories: categoriesService } = useContext(ServicesContext);

    useEffect(() => {
        setLoading(true);
        categoriesService
            .findMany({}, { limit: 100 })
            .then((response) => setCategories(response.list))
            .finally(() => setLoading(false));
    }, []);

    return useMemo(() => ({
        loading, categories,
    }), [ categories, loading ]);
};