import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import { createContext } from 'react';


export type WishlistContextType = {
    wishlist: Wishlist | null;
    setWishlist: (wishlist: Wishlist | null) => void;
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlist   : null,
    setWishlist: () => {
    },
});