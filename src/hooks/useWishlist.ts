import React, { useCallback, useContext, useMemo } from 'react';
import {
    WishlistContext,
    WishlistContextType,
} from '@/contexts/data/WishlistContext.ts';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import {
    AuthFormModalContext,
} from '@/contexts/components/AuthFormModalContext.tsx';
import { UserContext } from '@/contexts/data/UserContext.ts';


export type WishlistCallback = (productId: string) => Promise<any>;
export type InWishlistCallback = (productId: string) => boolean;

export interface IWishlistController {
    addToWishlist: WishlistCallback;
    removeFromWishlist: WishlistCallback;
    inWishlist: InWishlistCallback;
}

export const useWishlist = function (): IWishlistController {
    const wishlistContext: WishlistContextType = useContext(WishlistContext);
    const { wishlist: wishlistService }        = useContext(ServicesContext);
    const authModal                            = useContext(AuthFormModalContext);
    const userContext                          = useContext(UserContext);

    const addToWishlistCallback: WishlistCallback      = useCallback(async (productId: string) => {
        if (userContext.user) {
            return wishlistService
                .addToWishlist(productId)
                .then((wishlist: Wishlist) => wishlistContext.setWishlist(wishlist));
        } else {
            authModal.open();
        }
    }, [ wishlistContext, wishlistService ]);
    const removeFromWishlistCallback: WishlistCallback = useCallback(async (productId: string) => {
        if (userContext.user) {
            return wishlistService
                .removeFromWishlist(productId)
                .then((wishlist: Wishlist) => wishlistContext.setWishlist(wishlist));
        } else {
            authModal.open();
        }
    }, [ wishlistContext, wishlistService, authModal ]);
    const inWishlistCallback: InWishlistCallback       = useCallback((productId: string) => {
        return (!!wishlistContext.wishlist?.items.find((item) => item === productId)) ?? false;
    }, [ wishlistContext ]);

    return useMemo(() => ({
        addToWishlist     : addToWishlistCallback,
        removeFromWishlist: removeFromWishlistCallback,
        inWishlist        : inWishlistCallback,
    }), [ addToWishlistCallback, removeFromWishlistCallback, inWishlistCallback ]);
};