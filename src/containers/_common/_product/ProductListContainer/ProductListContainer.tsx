import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductList
    from '@/components/_common/_content/_product/ProductList/ProductList.tsx';
import { ServicesContext } from '@/contexts/ServicesContext.tsx';
import ProductCard
    from '@/components/_common/_content/_product/ProductCard/ProductCard.tsx';
import { CartContext } from '@/contexts/CartContext.ts';
import { WishlistContext } from '@/contexts/WishlistContext.ts';
import { Cart, CartItem } from '@/modules/api/cart/cart-service.types.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import { MultiplyResponse } from '@/modules/api.types.ts';


const ProductListContainer = () => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const services                  = useContext(ServicesContext);
    const cart                      = useContext(CartContext);
    const wishlist                  = useContext(WishlistContext);

    useEffect(() => {
        services
            .products
            .findMany({ available: true }, { limit: 30 })
            .then((response: MultiplyResponse<Product>) => setProducts(response.list));
    }, []);

    const addToWishlistCallback = useCallback((productId: string) => {
        return services
            .wishlist
            .addToWishlist(productId)
            .then((newWishlist: Wishlist) => wishlist.setWishlist(newWishlist));
    }, [ services.wishlist, wishlist ]);

    const addToCartCallback = useCallback((productId: string) => {
        return services
            .cart
            .addToCart(productId, 1)
            .then((newCart: Cart) => cart.setCart(newCart));
    }, [ services.cart, cart ]);

    const inWishlist = useCallback((productId: number) => {
        return wishlist.wishlist?.items.some((item: string) => item === productId.toString());
    }, [ wishlist.wishlist ]);
    const inCart     = useCallback((productId: number) => {
        return cart.cart?.items.find((cartItem: CartItem) => cartItem.productId === productId.toString())?.amount ?? 0;
    }, [ cart.cart ]);

    return (
        <ProductList>
            {
                products.map((product) => (
                    <ProductCard
                        product={ product }
                        key={ product.barcode }
                        onAddToWishlist={ addToWishlistCallback }
                        onAddToCart={ addToCartCallback }
                        inWishlist={ inWishlist(product.barcode) }
                        inCart={ inCart(product.barcode) }
                    />
                ))
            }
        </ProductList>
    );
};

export default ProductListContainer;