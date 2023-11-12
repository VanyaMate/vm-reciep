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
    from '@/components/_common/_content/_product/ProductView/ProductView.tsx';
import { CartContext } from '@/contexts/data/CartContext.ts';


export type ProductPageContainerProps = {
    productId: string;
}

const ProductPageContainer: React.FC<ProductPageContainerProps> = (props) => {
    const { productId }             = props;
    const { products, cart }        = useContext(ServicesContext);
    const { cart: myCart, setCart } = useContext(CartContext);
    const [ product, setProduct ]   = useState<Product | null>(null);
    const [ loading, setLoading ]   = useState<boolean>(false);

    // TODO: Вынести всё это в хуки.
    const addToCartHandler = useCallback((productId: string) => {
        return cart
            .addToCart(productId, 1)
            .then((cart) => setCart(cart));
    }, [ cart ]);

    const cartAmount = useMemo(() => {
        return myCart?.items.find((item) => item.productId === productId)?.amount ?? 0;
    }, [ productId, myCart ]);


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
        return 404;
    }

    return (
        <ProductView
            product={ product }
            onAddToCart={ addToCartHandler }
            inCart={ cartAmount }
        />
    );
};

export default ProductPageContainer;