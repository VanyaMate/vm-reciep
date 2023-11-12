import React from 'react';
import BadgeButton from '@/components/_ui/_button/BadgeButton/BadgeButton.tsx';
import { HeartOutlined } from '@ant-design/icons';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type HeaderUserWishlistProps = {
    wishlist: Wishlist;
}

const HeaderUserWishlist: React.FC<HeaderUserWishlistProps> = (props) => {
    const { wishlist } = props;

    return (
        <Button
            amount={ wishlist.items.length }
            styleType={ wishlist.items.length ? 'primary' : 'default' }
            square
        >
            <HeartOutlined/>
        </Button>
    );
};

export default HeaderUserWishlist;