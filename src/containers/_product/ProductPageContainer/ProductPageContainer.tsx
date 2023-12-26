import React, { useMemo } from 'react';
import ProductView
    from '@/components/_product/ProductView/ProductView.tsx';
import { useCart } from '@/hooks/useCart.ts';
import { useWishlist } from '@/hooks/useWishlist.ts';
import ProductViewSkeleton
    from '@/components/_product/ProductView/ProductViewSkeleton.tsx';
import ProductsCarousel
    from '@/components/_product/ProductsCarousel/ProductsCarousel.tsx';
import { useFetchProduct } from '@/hooks/products/useFetchProduct.ts';
import {
    useFetchProductRecommendationsById,
} from '@/hooks/products/useFetchProductRecommendationsById.ts';
import { getBrandPageUrl, getProductPageUrl } from '@/pages/getPage.ts';
import { useSearch } from '@/hooks/search/useSearch.ts';
import { useFetchBrand } from '@/hooks/brands/useFetchBrand.ts';
import Reviews from '@/components/_review/Reviews/Reviews.tsx';
import {
    ReviewBackendDataGenerator,
} from '@/modules/local-backend/review/review-backend.data-generator.ts';
import {
    UserBackendDataGenerator,
} from '@/modules/local-backend/user/user-backend.data-generator.ts';


export type ProductPageContainerProps = {
    productId: string;
}

const ProductPageContainer: React.FC<ProductPageContainerProps> = (props) => {
    const { productId }           = props;
    const cartController          = useCart();
    const wishlistController      = useWishlist();
    const [ _, searchController ] = useSearch();
    const {
              loading: recoLoading,
              products,
          }                       = useFetchProductRecommendationsById({ limit: 4 }, productId);
    const { loading, product }    = useFetchProduct(productId);
    const [ brandLoading, brand ] = useFetchBrand(product?.brand_name ?? '');
    // TODO: Temp
    const reviewGenerator         = new ReviewBackendDataGenerator();
    const userGenerator           = new UserBackendDataGenerator();
    const reviews                 = useMemo(() => [
        {
            review: reviewGenerator.filled(undefined),
            user  : userGenerator.filled(undefined),
        },
        {
            review: reviewGenerator.filled(undefined),
            user  : userGenerator.filled(undefined),
        },
        {
            review: reviewGenerator.filled(undefined),
            user  : userGenerator.filled(undefined),
        },
        {
            review: reviewGenerator.filled(undefined),
            user  : userGenerator.filled(undefined),
        },
        {
            review: reviewGenerator.filled(undefined),
            user  : userGenerator.filled(undefined),
        },
        {
            review: reviewGenerator.filled(undefined),
            user  : userGenerator.filled(undefined),
        },
    ], []);

    if (loading) {
        return <ProductViewSkeleton/>;
    }

    if (!product) {
        return 'товар не найден';
    }

    return (
        <>
            <ProductView
                product={ product }
                brand={ brand }
                brandUrl={ getBrandPageUrl(brand?.title ?? '') }
                brandLoading={ brandLoading }
                searchController={ searchController }
                cartController={ cartController }
                wishlistController={ wishlistController }
            />
            <ProductsCarousel
                products={ products }
                loading={ recoLoading }
                urlGenerator={ getProductPageUrl }
            />
            <Reviews
                loading={ false }
                stats={ [
                    { label: '5 звезд', rating: 5, count: 162 },
                    { label: '4 звезды', rating: 4, count: 54 },
                    { label: '3 звезды', rating: 3, count: 14 },
                    { label: '2 звезды', rating: 2, count: 12 },
                    { label: '1 звезда', rating: 1, count: 5 },
                ] }
                reviews={ reviews }
            />
        </>
    );
};

export default React.memo(ProductPageContainer);