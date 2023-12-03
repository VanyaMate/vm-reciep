import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBrand } from '@/hooks/brands/useFetchBrand.ts';


export type BrandPageProps = {}

const BrandPage: React.FC<BrandPageProps> = (props) => {
    const {}                 = props;
    const params             = useParams<{ id: string }>();
    const [ loading, brand ] = useFetchBrand(params.id ?? '');

    return (
        <div>
            {
                loading ? 'loading...' : ''
            }
            <h1>{ brand?.title }</h1>
            <p>{ brand?.description }</p>
        </div>
    );
};

export default React.memo(BrandPage);