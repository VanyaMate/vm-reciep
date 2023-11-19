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
import { useProductSearchParams } from '@/hooks/useProductSearchParams.ts';


const ProductListContainer = () => {
    const [ limit, setLimit ]       = useState<number>(30);
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ loading, setLoading ]   = useState<boolean>(true);
    const services                  = useContext(ServicesContext);
    const cartController            = useCart();
    const wishlistController        = useWishlist();
    const [ query, params ]         = useProductSearchParams();

    useEffect(() => {
        services
            .products
            .findMany((product) => {
                let approved = true;
                if (query && !product.product_name.match(new RegExp(query, 'gi'))) {
                    approved = false;
                }
                return approved && product.available;
            }, { limit, ...params })
            .then((response: MultiplyResponse<Product>) => setProducts(response.list))
            .finally(() => setLoading(false));
    }, [ query, params ]);

    return (
        <ProductList>
            {
                loading ? new Array(limit).fill(0).map((_, index) =>
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