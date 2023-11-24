import { UrlSearch } from '@/hooks/search/useSearch.ts';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/consts/search.ts';
import { MultiplyResponse } from '@/modules/api.types.ts';


export type UseFetchProducts = {
    products: Product[];
    loading: boolean;
}

export const useFetchProducts = function (search: Partial<UrlSearch>): UseFetchProducts {
    const { limit, page, sort, items } = search;
    const [ products, setProducts ]    = useState<Product[]>([]);
    const [ loading, setLoading ]      = useState<boolean>(true);
    const services                     = useContext(ServicesContext);

    useEffect(() => {
        setLoading(true);
        services
            .products
            .findMany((product) => {
                return items ? Object.entries(items).every(([ key, item ]) => {
                    const productValue = product[key as keyof Product];
                    if (item.type === 'match') {
                        return productValue.toString().match(new RegExp(item.value, 'gi'));
                    } else if (item.type === 'equal') {
                        return item.value === productValue;
                    } else {
                        const matches: RegExpMatchArray | null = item.value.match(/\d+/gi);
                        if (matches) {
                            const [ min, max ] = matches;
                            // TODO: /10 нужно потому что все цены умножены
                            //  на 10. Когда нужно будет убрать отсюда
                            if (+productValue >= (+min / 10) && +productValue < (+max / 10)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    }
                }) : true;
            }, {
                limit : limit ?? DEFAULT_LIMIT,
                offset: ((page ?? DEFAULT_PAGE) - 1) * (limit ?? DEFAULT_LIMIT),
                sort,
            })
            .then((response: MultiplyResponse<Product>) => setProducts(response.list))
            .finally(() => setLoading(false));
    }, [ limit, page, sort, items ]);

    return useMemo(() => ({
        products, loading,
    }), [ products, loading ]);
};