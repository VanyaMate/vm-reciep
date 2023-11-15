import { ICartController } from '@/hooks/useCart.ts';
import { useCallback, useMemo, useState } from 'react';


export type UseCartButton = {
    loading: boolean;
    inCart: number;
    onClick: () => void;
}

export type UseCartButtonProps = {
    productId: string;
    cartController: ICartController;
}

export const useCartButton = function (props: UseCartButtonProps): UseCartButton {
    const { productId, cartController } = props;

    const [ loading, setLoading ] = useState<boolean>(false);
    const inCart: number          = useMemo(() => {
        return cartController.inCart(productId);
    }, [ productId, cartController ]);

    const onClick = useCallback(() => {
        setLoading(true);
        cartController
            .addToCart(productId, 1)
            .finally(() => setLoading(false));
    }, [ cartController ]);

    return {
        loading, inCart, onClick,
    };
};