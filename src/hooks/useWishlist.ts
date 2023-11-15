import { useCallback, useContext } from 'react';
import {
    WishlistContext,
    WishlistContextType,
} from '@/contexts/data/WishlistContext.ts';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';


export type WishlistCallback = (productId: string) => Promise<any>;
export type InWishlistCallback = (productId: string) => boolean;

export interface IWishlistController {
    addToWishlist: WishlistCallback;
    removeFromWishlist: WishlistCallback;
    inWishlist: InWishlistCallback;
}

export const useWishlist = function (): IWishlistController {
    const wishlistContext: WishlistContextType         = useContext(WishlistContext);
    const { wishlist: wishlistService }                = useContext(ServicesContext);
    const addToWishlistCallback: WishlistCallback      = useCallback((productId: string) => {
        return wishlistService
            .addToWishlist(productId)
            .then((wishlist: Wishlist) => wishlistContext.setWishlist(wishlist));
    }, [ wishlistContext, wishlistService ]);
    const removeFromWishlistCallback: WishlistCallback = useCallback((productId: string) => {
        return wishlistService
            .removeFromWishlist(productId)
            .then((wishlist: Wishlist) => wishlistContext.setWishlist(wishlist));
    }, [ wishlistContext, wishlistService ]);
    const inWishlistCallback: InWishlistCallback       = useCallback((productId: string) => {
        return (!!wishlistContext.wishlist?.items.find((item) => item === productId)) ?? false;
    }, [ wishlistContext ]);

    return {
        addToWishlist     : addToWishlistCallback,
        removeFromWishlist: removeFromWishlistCallback,
        inWishlist        : inWishlistCallback,
    };
};