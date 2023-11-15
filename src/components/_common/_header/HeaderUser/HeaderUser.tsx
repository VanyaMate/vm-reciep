import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import HeaderUserCart
    from '@/components/_common/_header/HeaderUser/HeaderUserCart/HeaderUserCart.tsx';
import css from './HeaderUser.module.scss';
import HeaderUserProfile
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfile.tsx';
import HeaderUserWishlist
    from '@/components/_common/_header/HeaderUser/HeaderUserWishlist/HeaderUserWishlist.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import HeaderUserProfileSkeleton
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfileSkeleton.tsx';


export type HeaderUserProps = {
    user: User | null;
    cart: Cart | null;
    wishlist: Wishlist | null;
    process?: boolean;
}

const HeaderUser: React.FC<HeaderUserProps> = (props: HeaderUserProps) => {
    const { user, cart, wishlist, process } = props;


    if (process && !user) {
        return (
            <div className={ css.container }>
                <Button skeleton square> </Button>
                <Button skeleton square> </Button>
                <HeaderUserProfileSkeleton/>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={ css.container }>
                login
            </div>
        );
    }

    return (
        <div className={ css.container }>
            { cart && <HeaderUserCart cart={ cart }/> }
            { wishlist &&
                <HeaderUserWishlist wishlist={ wishlist }/> }
            { user && <HeaderUserProfile user={ user }/> }
        </div>
    );
};

export default HeaderUser;