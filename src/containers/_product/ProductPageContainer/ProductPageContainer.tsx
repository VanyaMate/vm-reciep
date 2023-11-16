import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductView
    from '@/components/_product/ProductView/ProductView.tsx';
import { CartContext } from '@/contexts/data/CartContext.ts';
import { useCart } from '@/hooks/useCart.ts';
import { useWishlist } from '@/hooks/useWishlist.ts';


export type ProductPageContainerProps = {
    productId: string;
}

const ProductPageContainer: React.FC<ProductPageContainerProps> = (props) => {
    const { productId }           = props;
    const { products }            = useContext(ServicesContext);
    const [ product, setProduct ] = useState<Product | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const cartController          = useCart();
    const wishlistController      = useWishlist();

    useEffect(() => {
        setLoading(true);
        products
            .findOne(productId)
            .then((product) => setProduct(product))
            .finally(() => setLoading(false));
    }, [ productId ]);

    if (loading) {
        return 'skeleton';
    }

    if (!product) {
        return 'товар не найден';
    }

    return (
        <ProductView
            product={ product }
            cartController={ cartController }
            wishlistController={ wishlistController }
        />
    );
};

export default React.memo(ProductPageContainer);