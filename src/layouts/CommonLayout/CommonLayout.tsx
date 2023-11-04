import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageContent from '@/components/_common/PageContent/PageContent.tsx';
import Header
    from '@/components/_common/_header/Header/Header.tsx';
import Footer from '@/components/_common/_footer/Footer/Footer.tsx';
import HeaderBanner
    from '@/components/_common/_header/HeaderBanner/HeaderBanner.tsx';
import HeaderSearch
    from '@/components/_common/_header/HeaderSearch/HeaderSearch.tsx';
import { AuthContext } from '@/contexts/AuthContext.ts';
import HeaderLogo from '@/components/_common/_header/HeaderLogo/HeaderLogo.tsx';
import HeaderUser from '@/components/_common/_header/HeaderUser/HeaderUser.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import { Cart, CartItem } from '@/modules/api/cart/cart-service.types.ts';
import { EntitiesContext } from '@/contexts/EntitiesContext.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';


/***
 * Как будто какая то дичь. Ну да ладно. Пойду спать. хехе.
 * @returns {JSX.Element}
 * @constructor
 */

const CommonLayout = () => {
    const [ process, setProcess ]   = useState<boolean>(false);
    const [ user, setUser ]         = useState<User | null>(null);
    const [ cart, setCart ]         = useState<CartItem[] | null>(null);
    const [ wishlist, setWishlist ] = useState<Wishlist | null>(null);

    const entities = useContext(EntitiesContext);

    useEffect(() => {
        const setAuthHandler     = function (authData: AuthData | null) {
            entities.user.set(authData?.user ?? null);
            entities.cart.set(authData?.cart ?? null);
            entities.wishlist.set(authData?.wishlist ?? null);
        };
        const authProcessHandler = function (status: boolean) {
            setProcess(status);
        };
        const setUserHandler     = function (user: User | null) {
            setUser(user);
        };
        const setCartHandler     = function (cart: CartItem[] | null) {
            setCart(cart);
        };
        const setWishlistHandler = function (wishlist: Wishlist | null) {
            setWishlist(wishlist);
        };

        entities.auth.subscribe('auth', setAuthHandler);
        entities.auth.subscribe('process', authProcessHandler);
        entities.user.subscribe('set', setUserHandler);
        entities.cart.subscribe('set', setCartHandler);
        entities.wishlist.subscribe('set', setWishlistHandler);

        return () => {
            entities.auth.unsubscribe('auth', setAuthHandler);
            entities.auth.unsubscribe('process', authProcessHandler);
            entities.user.unsubscribe('set', setUserHandler);
            entities.cart.unsubscribe('set', setCartHandler);
            entities.wishlist.unsubscribe('set', setWishlist);
        };
    }, []);

    return (
        <PageContent
            top={
                <>
                    <Header
                        left={ <HeaderLogo/> }
                        right={ <HeaderUser process={ process }
                                            user={ user }
                                            cart={ cart }
                                            wishlist={ wishlist }
                        /> }
                    />
                    <HeaderBanner
                        background={ 'https://images.unsplash.com/photo-1576562331281-d09e46af9854?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D' }
                        footer={ <HeaderSearch/> }
                    />
                    <Outlet/>
                </>
            }
            footer={
                <Footer/>
            }
        />
    );
};

export default CommonLayout;