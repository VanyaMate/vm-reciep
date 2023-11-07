import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { useCallback, useContext, useMemo } from 'react';
import { ServicesContext } from '@/contexts/ServicesContext.tsx';
import { AuthContext } from '@/contexts/AuthContext.ts';
import { UserContext } from '@/contexts/UserContext.ts';
import { CartContext } from '@/contexts/CartContext.ts';
import { WishlistContext } from '@/contexts/WishlistContext.ts';


export const useAuth = function (): IAuthService<AuthData> & {
    process: boolean
} {
    const services = useContext(ServicesContext);
    const auth     = useContext(AuthContext);
    const user     = useContext(UserContext);
    const cart     = useContext(CartContext);
    const wishlist = useContext(WishlistContext);

    const login = useCallback((login: string, password: string, remember: boolean) => {
        auth.setProcess(true);
        return services
            .auth
            .login(login, password, remember)
            .then((authData) => {
                user.setUser(authData.user);
                cart.setCart(authData.cart);
                wishlist.setWishlist(authData.wishlist);
                return authData;
            })
            .finally(() => auth.setProcess(false));
    }, [ services, auth ]);

    const registration = useCallback((login: string, password: string, remember: boolean) => {
        auth.setProcess(true);
        return services
            .auth
            .registration(login, password, remember)
            .then((authData) => {
                user.setUser(authData.user);
                cart.setCart(authData.cart);
                wishlist.setWishlist(authData.wishlist);
                return authData;
            })
            .finally(() => auth.setProcess(false));
    }, [ services, auth ]);

    const logout = useCallback(() => {
        auth.setProcess(true);
        return services
            .auth
            .logout()
            .then(() => {
                user.setUser(null);
                cart.setCart(null);
                wishlist.setWishlist(null);
            })
            .then(() => true)
            .finally(() => auth.setProcess(false));
    }, [ services, auth ]);

    const refresh = useCallback(() => {
        auth.setProcess(true);
        return services
            .auth
            .refresh()
            .then((authData) => {
                user.setUser(authData.user);
                cart.setCart(authData.cart);
                wishlist.setWishlist(authData.wishlist);
                return authData;
            })
            .finally(() => auth.setProcess(false));
    }, [ services, auth ]);

    return useMemo(() => ({
        login,
        registration,
        logout,
        refresh,
        process: auth!.process,
    }), [ login, refresh, login, refresh, auth ]);
};