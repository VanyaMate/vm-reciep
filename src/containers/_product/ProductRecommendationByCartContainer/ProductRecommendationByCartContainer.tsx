import React, { useContext, useMemo } from 'react';
import TitledBlock
    from '@/components/_ui/_container/TitledBlock/TitledBlock.tsx';
import {
    useFetchProductRecommendationsById,
} from '@/hooks/products/useFetchProductRecommendationsById.ts';
import { CartContext } from '@/contexts/data/CartContext.ts';
import { getRandomInt } from '@/helpers/random.ts';
import { AuthContext } from '@/contexts/data/AuthContext.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductsTile from '@/components/_product/ProductsTile/ProductsTile.tsx';
import ProductCard from '@/components/_product/ProductCard/ProductCard.tsx';
import { getProductPageUrl } from '@/pages/getPage.ts';
import SkeletonText
    from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';
import ProductCardSkeleton
    from '@/components/_product/ProductCard/ProductCardSkeleton/ProductCardSkeleton.tsx';


export type ProductRecommendationByCartContainerProps = {
    title: string;
}

const ProductRecommendationByCartContainer: React.FC<ProductRecommendationByCartContainerProps> = (props) => {
    const { title }                 = props;
    const { cart }                  = useContext(CartContext);
    const { process }               = useContext(AuthContext);
    const productId                 = useMemo(() => {
        return cart?.items[getRandomInt(0, cart?.items.length)]?.productId ?? '';
    }, [ cart ]);
    const { loading, products, by } = useFetchProductRecommendationsById(
        { limit: 12 },
        productId,
        process,
    );
    const productsToShow            = useMemo(() => {
        const toShow: Product[] = [];
        const clone: Product[]  = [ ...products ];
        for (let i = 0; i < 4; i++) {
            const takeIndex: number = getRandomInt(0, clone.length - 1);
            const product: Product  = clone.splice(takeIndex, 1)[0];
            product && toShow.push(product);
        }
        return toShow;
    }, [ products ]);

    if (loading || productsToShow.length === 0) {
        return (
            <TitledBlock title={ <SkeletonText>Text</SkeletonText> }>
                <ProductsTile>
                    {
                        new Array(4).fill(null).map((_, index) => (
                            <ProductCardSkeleton
                                key={ index }
                            />
                        ))
                    }
                </ProductsTile>
            </TitledBlock>
        );
    }

    return (
        <TitledBlock title={ title + (by ? `. Больше ${ by }` : '') }>
            <ProductsTile>
                {
                    productsToShow.map((product) => (
                        <ProductCard
                            key={ product.barcode }
                            product={ product }
                            url={ getProductPageUrl(product.barcode.toString()) }
                        />
                    ))
                }
            </ProductsTile>
        </TitledBlock>
    );
};

export default React.memo(ProductRecommendationByCartContainer);