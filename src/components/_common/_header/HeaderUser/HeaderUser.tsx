import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';
import { Cart, CartItem } from '@/modules/api/cart/cart-service.types.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import HeaderUserCart
    from '@/components/_common/_header/HeaderUser/HeaderUserCart/HeaderUserCart.tsx';
import css from './HeaderUser.module.scss';
import BadgeButton from '@/components/_ui/_button/BadgeButton/BadgeButton.tsx';
import HeaderUserProfile
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfile.tsx';
import HeaderUserWishlist
    from '@/components/_common/_header/HeaderUser/HeaderUserWishlist/HeaderUserWishlist.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type HeaderUserProps = {
    user: User | null;
    cart: CartItem[] | null;
    wishlist: Wishlist | null;
    process?: boolean;
}

const HeaderUser: React.FC<HeaderUserProps> = (props: HeaderUserProps) => {
    const { user, cart, wishlist, process } = props;

    if (process) {
        return (
            <div className={ css.container }>
                <Button skeleton square/>
                <Button skeleton square/>
                <HeaderUserProfile user={ user } skeleton/>
            </div>
        );
    }

    return (
        <div className={ css.container }>
            { wishlist &&
                <HeaderUserWishlist wishlist={ wishlist }/> }
            { cart && <HeaderUserCart cart={ cart }/> }
            { user && <HeaderUserProfile user={ user }/> }
        </div>
    );
};

export default HeaderUser;