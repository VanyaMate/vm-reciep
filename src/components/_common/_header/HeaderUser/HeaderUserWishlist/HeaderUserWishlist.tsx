import React from 'react';
import BadgeButton from '@/components/_ui/_button/BadgeButton/BadgeButton.tsx';
import { HeartOutlined } from '@ant-design/icons';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';


export type HeaderUserWishlistProps = {
    wishlist: Wishlist | null;
}

const HeaderUserWishlist: React.FC<HeaderUserWishlistProps> = (props) => {
    const { wishlist } = props;

    return (
        wishlist && <BadgeButton
            amount={ wishlist.items.length }
            icon={ <HeartOutlined/> }
        />
    );
};

export default HeaderUserWishlist;