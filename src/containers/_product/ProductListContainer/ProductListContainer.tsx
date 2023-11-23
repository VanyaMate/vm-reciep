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
import { useSearch } from '@/hooks/search/useSearch.ts';


const ProductListContainer = () => {
    const [ products, setProducts ]        = useState<Product[]>([]);
    const [ loading, setLoading ]          = useState<boolean>(true);
    const services                         = useContext(ServicesContext);
    const cartController                   = useCart();
    const wishlistController               = useWishlist();
    const [ { limit, page, sort, items } ] = useSearch();

    useEffect(() => {
        services
            .products
            .findMany((product) => {
                return Object.entries(items).every(([ key, item ]) => {
                    const productValue = product[key as keyof Product];
                    if (item.type === 'match') {
                        return new RegExp(`${ item.value }`, 'gi').test(productValue.toString());
                    } else if (item.type === 'equal') {
                        return item.value === productValue;
                    } else {
                        const [ min, max ] = item.value.split('-');
                        if (productValue >= min && productValue < max) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
            }, { limit, offset: (page - 1) * limit, sort })
            .then((response: MultiplyResponse<Product>) => setProducts(response.list))
            .finally(() => setLoading(false));
    }, [ limit, page, sort, items ]);

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