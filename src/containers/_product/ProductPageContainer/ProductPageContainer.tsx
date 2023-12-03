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
    useFetchProductRecommendationsById,
} from '@/hooks/products/useFetchProductRecommendationsById.ts';
import { getBrandPageUrl, getProductPageUrl } from '@/pages/getPage.ts';
import { useSearch } from '@/hooks/search/useSearch.ts';
import { useFetchBrand } from '@/hooks/brands/useFetchBrand.ts';


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
        </>
    );
};

export default React.memo(ProductPageContainer);