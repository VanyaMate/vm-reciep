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
import { useSearchUrlParams } from '@/hooks/search/useSearchUrlParams.ts';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/consts/search.ts';


const ProductListContainer = () => {
    const [ products, setProducts ]        = useState<Product[]>([]);
    const [ loading, setLoading ]          = useState<boolean>(true);
    const services                         = useContext(ServicesContext);
    const cartController                   = useCart();
    const wishlistController               = useWishlist();
    const [ { limit, page, sort, items } ] = useSearchUrlParams();

    useEffect(() => {
        services
            .products
            .findMany((product) => {
                return items ? Object.entries(items).every(([ key, item ]) => {
                    const productValue = product[key as keyof Product];
                    if (item.type === 'match') {
                        return new RegExp(`${ item.value }`, 'gi').test(productValue.toString());
                    } else if (item.type === 'equal') {
                        return item.value === productValue;
                    } else {
                        const matches: RegExpMatchArray | null = item.value.match(/\d+/gi);
                        if (matches) {
                            const [ min, max ] = matches;
                            // TODO: /10 нужно потому что все цены умножены
                            //  на 10. Когда нужно будет убрать отсюда
                            if (+productValue >= (+min / 10) && +productValue < (+max / 10)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    }
                }) : true;
            }, {
                limit : limit ?? DEFAULT_LIMIT,
                offset: (page ?? DEFAULT_PAGE - 1) * (limit ?? DEFAULT_LIMIT),
                sort,
            })
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