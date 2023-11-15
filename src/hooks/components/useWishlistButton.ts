import { useCallback, useMemo, useState } from 'react';
import { IWishlistController } from '@/hooks/useWishlist.ts';


export type UseWishlistButton = {
    loading: boolean;
    inWishlist: boolean;
    onClick: () => void;
}

export type UseWishlistButtonProps = {
    productId: string;
    wishlistController: IWishlistController;
}

export const useWishlistButton = function (props: UseWishlistButtonProps): UseWishlistButton {
    const { productId, wishlistController } = props;

    const [ loading, setLoading ] = useState<boolean>(false);
    const inWishlist: boolean     = useMemo(() => {
        return wishlistController.inWishlist(productId);
    }, [ productId, wishlistController ]);

    const onClick = useCallback(() => {
        setLoading(true);
        (inWishlist ? wishlistController.removeFromWishlist(productId)
                    : wishlistController.addToWishlist(productId))
            .finally(() => setLoading(false));
    }, [ wishlistController, inWishlist ]);

    return {
        loading, inWishlist, onClick,
    };
};