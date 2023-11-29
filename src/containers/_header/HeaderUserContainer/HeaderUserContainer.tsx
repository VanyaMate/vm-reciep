import React, { useContext, useMemo } from 'react';
import HeaderUserCart
    from '@/components/_common/_header/HeaderUser/HeaderUserCart/HeaderUserCart.tsx';
import css from './HeaderUserContainer.module.scss';
import HeaderUserProfile
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfile.tsx';
import HeaderUserWishlist
    from '@/components/_common/_header/HeaderUser/HeaderUserWishlist/HeaderUserWishlist.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import HeaderUserProfileSkeleton
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfileSkeleton.tsx';
import { AuthContext } from '@/contexts/data/AuthContext.ts';
import { UserContext } from '@/contexts/data/UserContext.ts';
import { CartContext } from '@/contexts/data/CartContext.ts';
import { WishlistContext } from '@/contexts/data/WishlistContext.ts';
import {
    DropdownListItem,
} from '@/components/_ui/_dropdown/DropdownList/DropdownList.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import {
    AuthFormModalContext,
} from '@/contexts/components/AuthFormModalContext.tsx';
import { useRegistrationForm } from '@/hooks/components/useRegistrationForm.ts';
import { useNavigate } from 'react-router-dom';
import { PageType } from '@/pages/getPage.ts';


const HeaderUserContainer = () => {
    const { process }            = useContext(AuthContext);
    const { user }               = useContext(UserContext);
    const { cart }               = useContext(CartContext);
    const { wishlist }           = useContext(WishlistContext);
    const modalContext           = useContext(AuthFormModalContext);
    const auth                   = useAuth();
    const registrationController = useRegistrationForm({
        authService: auth,
        onFinish   : modalContext.close,
    });
    const navigate               = useNavigate();

    const menuItems: DropdownListItem[] = useMemo(() => {
        return [
            {
                label: 'Профиль',
            },
            {
                label: 'Настройки',
            },
            {
                label  : 'Выйти',
                type   : 'danger',
                onClick: auth.logout,
            },
        ];
    }, []);


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
            <Button
                className={ css.container }
                styleType={ 'main' }
                onClick={ modalContext.open }
            >
                Войти
            </Button>
        );
    }

    return (
        <div className={ css.container }>
            { cart &&
                <HeaderUserCart cart={ cart }
                                onClick={ () => navigate(`/${ PageType.CART }`) }/> }
            { wishlist &&
                <HeaderUserWishlist wishlist={ wishlist }/> }
            { user &&
                <HeaderUserProfile user={ user } menuItems={ menuItems }/> }
        </div>
    );
};

export default HeaderUserContainer;