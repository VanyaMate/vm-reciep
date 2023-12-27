import React, { useCallback, useContext, useMemo, useState } from 'react';
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
import Reviews, { ReviewView } from '@/components/_review/Reviews/Reviews.tsx';
import {
    ReviewBackendDataGenerator,
} from '@/modules/local-backend/review/review-backend.data-generator.ts';
import {
    UserBackendDataGenerator,
} from '@/modules/local-backend/user/user-backend.data-generator.ts';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { SendReviewMethod } from '@/hooks/reviews/useFetchSendReview.ts';
import { ReviewData } from '@/modules/api/review/review-service.interface.ts';
import { useFetchReviews } from '@/hooks/reviews/useFetchReviews.ts';
import { useAuth } from '@/hooks/useAuth.ts';
import { UserContext } from '@/contexts/data/UserContext.ts';


export type ProductPageContainerProps = {
    productId: string;
}

const ProductPageContainer: React.FC<ProductPageContainerProps> = (props) => {
    const { productId }                               = props;
    const { review }                                  = useContext(ServicesContext);
    const user                                        = useContext(UserContext);
    const cartController                              = useCart();
    const wishlistController                          = useWishlist();
    const [ _, searchController ]                     = useSearch();
    const {
              loading: recoLoading,
              products,
          }                                           = useFetchProductRecommendationsById({ limit: 4 }, productId);
    const {
              loading, product,
          }                                           = useFetchProduct(productId);
    const [ brandLoading, brand ]                     = useFetchBrand(product?.brand_name ?? '');
    const {
              loading: reviewsLoading, reviews, count, stats,
          }                                           = useFetchReviews('product', productId);
    const [ additionalReviews, setAdditionalReviews ] = useState<ReviewView[]>([]);
    const sendReviewMethod: SendReviewMethod          = useCallback(async (data: ReviewData) => {
        return review
            .send('product', data)
            .then((review) => {
                setAdditionalReviews([
                    {
                        review, user: user.user!,
                    }, ...additionalReviews,
                ]);
                return review;
            });
    }, [ review, user, additionalReviews ]);

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
                id={ productId }
                loading={ reviewsLoading }
                stats={ stats }
                authorized={ !!user.user }
                reviews={ reviews }
                additional={ additionalReviews }
                onReview={ sendReviewMethod }
            />
        </>
    );
};

export default React.memo(ProductPageContainer);