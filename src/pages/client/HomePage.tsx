import React, { useCallback, useContext } from 'react';
import ProductListContainer
    from '@/containers/_product/ProductListContainer/ProductListContainer.tsx';
import Banner from '@/components/_common/_content/Banner/Banner.tsx';
import BannerTitle
    from '@/components/_common/_content/Banner/items/BannerTitle/BannerTitle.tsx';
import BannerDescription
    from '@/components/_common/_content/Banner/items/BannerDescription/BannerDescription.tsx';
import { useSearchNavigate } from '@/hooks/search/useSearchNavigate.ts';
import { getProductPageUrl, PageType } from '@/pages/getPage.ts';
import { SearchContext } from '@/contexts/data/SearchContext.ts';
import { useNavigate } from 'react-router-dom';
import ProductsCarousel
    from '@/components/_product/ProductsCarousel/ProductsCarousel.tsx';
import {
    useFetchProductRecommendationsById,
} from '@/hooks/products/useFetchProductRecommendationsById.ts';
import { CartContext } from '@/contexts/data/CartContext.ts';
import { AuthContext } from '@/contexts/data/AuthContext.ts';
import ProductsTile from '@/components/_product/ProductsTile/ProductsTile.tsx';
import ProductTile
    from '@/components/_product/ProductsTile/ProductTile/ProductTile.tsx';
import ProductList from '@/components/_product/ProductList/ProductList.tsx';
import ProductCard from '@/components/_product/ProductCard/ProductCard.tsx';
import TitledBlock
    from '@/components/_common/_content/TitledBlock/TitledBlock.tsx';
import ProductRecommendationByCartContainer
    from '@/containers/_product/ProductRecommendationByCartContainer/ProductRecommendationByCartContainer.tsx';
import Blocks from '@/components/_ui/_container/Blocks/Blocks.tsx';


const HomePage = () => {
    const navigator             = useSearchNavigate();
    const [ data ]              = useContext(SearchContext);
    const onBannerClick         = useCallback(() => {
        navigator.navigate(`/${ PageType.PRODUCTS }`, {
            ...data,
            items: {
                discount: {
                    value: '[1,*]',
                    type : 'range',
                },
            },
        });
    }, [ navigator, data ]);
    const { cart }              = useContext(CartContext);
    const { process }           = useContext(AuthContext);
    const { loading, products } = useFetchProductRecommendationsById(
        { limit: 4 },
        cart?.items[0]?.productId ?? '',
        process,
    );

    return (
        <Blocks>
            <Banner
                img={ 'https://sun9-46.userapi.com/impg/PPprrvV6o28zVqWVQBLlJLjAGgBQtxBXucbkEw/4QRpxJAK4Xo.jpg?size=1024x320&quality=96&sign=05702f8792e6f8ac0bc280545285fd1c&type=album' }
                onClick={ onBannerClick }
                top={ <BannerTitle title={ 'Большие скидки' }/> }
                footer={
                    <BannerDescription
                        text={ 'Множество товаров по низким ценам' }
                    />
                }
            />
            <ProductRecommendationByCartContainer title={ 'Вам может' +
                ' понравиться' }/>
            <Banner
                img={ 'https://sun9-46.userapi.com/impg/PPprrvV6o28zVqWVQBLlJLjAGgBQtxBXucbkEw/4QRpxJAK4Xo.jpg?size=1024x320&quality=96&sign=05702f8792e6f8ac0bc280545285fd1c&type=album' }
                onClick={ onBannerClick }
                top={ <BannerTitle title={ 'Большие скидки' }/> }
                footer={
                    <BannerDescription
                        text={ 'Множество товаров по низким ценам' }
                    />
                }
            />
            <ProductRecommendationByCartContainer title={ 'Вам может' +
                ' понравиться' }/>
            <ProductRecommendationByCartContainer title={ 'Вам может' +
                ' понравиться' }/>
        </Blocks>
    );
};

export default React.memo(HomePage);