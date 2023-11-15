import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductList
    from '@/components/_product/ProductList/ProductList.tsx';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import ProductCard
    from '@/components/_product/ProductCard/ProductCard.tsx';
import { CartContext } from '@/contexts/data/CartContext.ts';
import { WishlistContext } from '@/contexts/data/WishlistContext.ts';
import { Cart, CartItem } from '@/modules/api/cart/cart-service.types.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import { MultiplyResponse } from '@/modules/api.types.ts';
import ProductCardSkeleton
    from '@/components/_product/ProductCard/ProductCardSkeleton/ProductCardSkeleton.tsx';
import { useCart } from '@/hooks/useCart.ts';
import { useWishlist } from '@/hooks/useWishlist.ts';


const ProductListContainer = () => {
    const [ limit, setLimit ]       = useState<number>(30);
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ loading, setLoading ]   = useState<boolean>(true);
    const services                  = useContext(ServicesContext);
    const cartController            = useCart();
    const wishlistController        = useWishlist();

    useEffect(() => {
        services
            .products
            .findMany({ available: true }, { limit })
            .then((response: MultiplyResponse<Product>) => setProducts(response.list))
            .finally(() => setLoading(false));
    }, []);

    return (
        <ProductList>
            {
                loading ? new Array(limit).fill(0).map((_, index) =>
                            <ProductCardSkeleton key={ index }/>)
                        : products.map((product) => (
                            <ProductCard
                                product={ product }
                                key={ product.barcode }
                                cartController={ cartController }
                                wishlistController={ wishlistController }
                            />
                        ))
            }
        </ProductList>
    );
};

export default ProductListContainer;