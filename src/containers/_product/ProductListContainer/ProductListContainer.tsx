import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductList
    from '@/components/_product/ProductList/ProductList.tsx';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import ProductCard
    from '@/components/_product/ProductCard/ProductCard.tsx';
import { MultiplyResponse } from '@/modules/api.types.ts';
import ProductCardSkeleton
    from '@/components/_product/ProductCard/ProductCardSkeleton/ProductCardSkeleton.tsx';
import { useCart } from '@/hooks/useCart.ts';
import { useWishlist } from '@/hooks/useWishlist.ts';
import AddToCartButton
    from '@/components/_product/AddToCartButton/AddToCartButton.tsx';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import WishlistButton
    from '@/components/_product/WishlistButton/WishlistButton.tsx';
import { getProductPageUrl } from '@/pages/getPage.ts';
import { DEFAULT_LIMIT } from '@/consts/search.ts';
import { useFetchProducts } from '@/hooks/products/useFetchProducts.ts';
import { SearchContext } from '@/contexts/data/SearchContext.ts';


const ProductListContainer = () => {
    const cartController        = useCart();
    const wishlistController    = useWishlist();
    const [ data ]              = useContext(SearchContext);
    const { products, loading } = useFetchProducts(data);

    return (
        <ProductList>
            {
                loading ? new Array(DEFAULT_LIMIT).fill(0).map((_, index) =>
                            <ProductCardSkeleton key={ index }/>)
                        : products.map((product) => (
                            <ProductCard
                                product={ product }
                                key={ product.barcode }
                                url={ getProductPageUrl(product.barcode.toString()) }
                                top={
                                    <>
                                        <Tag
                                            backgroundColor={ '#fff' }
                                            textColor={ '#333' }
                                        >
                                            { product.brand_name }
                                        </Tag>
                                        <WishlistButton
                                            productId={ product.barcode.toString() }
                                            wishlistController={ wishlistController }
                                        />
                                    </>
                                }
                                footer={
                                    <AddToCartButton
                                        productId={ product.barcode.toString() }
                                        cartController={ cartController }
                                        block
                                    />
                                }
                            />
                        ))
            }
        </ProductList>
    );
};

export default ProductListContainer;