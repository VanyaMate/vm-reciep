import {
    ISearchController,
} from '@/components/_common/_header/HeaderSearch/HeaderSearch.tsx';
import { SearchParam } from '@/hooks/useProductSearchParams.ts';
import { useSearchParams } from 'react-router-dom';


export const useSearchParamsController = function (): ISearchController {
    const [ _, setUrlParams ] = useSearchParams();

    return {
        set (type: SearchParam, value: string): void {
            setUrlParams((prev) => {
                prev.set(type, value);
                return prev;
            });
        },
        remove (type: SearchParam): void {
            setUrlParams((prev) => {
                prev.delete(type);
                return prev;
            });
        },
    };
};