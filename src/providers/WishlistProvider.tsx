import React, { useState } from 'react';
import { WishlistContext } from '@/contexts/data/WishlistContext.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';


const WishlistProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [ wishlist, setWishlist ] = useState<Wishlist | null>(null);

    return (
        <WishlistContext.Provider
            value={ { wishlist, setWishlist } } { ...props }/>
    );
};

export default WishlistProvider;