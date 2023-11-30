import React, {} from 'react';
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
    useFetchProductRecommendations,
} from '@/hooks/products/useFetchProductRecommendations.ts';
import { getProductPageUrl } from '@/pages/getPage.ts';
import { useSearch } from '@/hooks/search/useSearch.ts';


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
          }                       = useFetchProductRecommendations(productId);
    const { loading, product }    = useFetchProduct(productId);

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
                searchController={ searchController }
                cartController={ cartController }
                wishlistController={ wishlistController }
            />
            <ProductsCarousel
                products={ products }
                loading={ recoLoading }
                urlGenerator={ getProductPageUrl }
            />
        </>
    );
};

export default React.memo(ProductPageContainer);