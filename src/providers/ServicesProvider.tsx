import React, { useContext, useMemo } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import {
    UserAuthContext,
    UserAuthContextType,
} from '@/contexts/data/UserAuthContext.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import { ICartService } from '@/modules/api/cart/cart-service.interface.ts';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import {
    LocalCartService,
} from '@/modules/api/cart/services/local-cart-service.ts';
import { CartBackend } from '@/modules/local-backend/cart/cart-backend.ts';
import {
    IWishlistService,
} from '@/modules/api/wishlist/wishlist-service.interface.ts';
import {
    CreateWishlistDto, UpdateWishlistDto,
    Wishlist,
} from '@/modules/api/wishlist/wishlist-service.types.ts';
import {
    WishlistBackend,
} from '@/modules/local-backend/wishlist/wishlist-backend.ts';
import {
    LocalWishlistService,
} from '@/modules/api/wishlist/services/local-wishlist.service.ts';
import {
    IProductsService,
} from '@/modules/api/products/products-service.interface.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    LocalProductsService,
} from '@/modules/api/products/services/local-products-service.ts';
import {
    ProductsBackend,
} from '@/modules/local-backend/products/products-backend.ts';
import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import {
    LocalAuthService,
} from '@/modules/api/auth/services/local-auth-service.ts';
import { UserBackend } from '@/modules/local-backend/user/user-backend.ts';
import {
    UserBackendMapper,
} from '@/modules/local-backend/user/user-backend.mapper.ts';
import {
    ISingleService,
    StorageService,
} from '@vanyamate/market-place-service';
import {
    CreateCartDto, UpdateCartDto,
} from '@/modules/local-backend/cart/cart-backend.types.ts';
import { UserContext, UserContextType } from '@/contexts/data/UserContext.ts';


export type ServicesProviderProps = {
    children: React.ReactNode;
}

const ServicesProvider: React.FC<ServicesProviderProps> = (props) => {
    const userContext: UserContextType = useContext(UserContext);
    const user: User | null            = useMemo(() => userContext.user, [ userContext ]);

    const cartBackend: ISingleService<Cart, CreateCartDto, UpdateCartDto>                 = useMemo(() => new CartBackend(), []);
    const wishlistBackend: ISingleService<Wishlist, CreateWishlistDto, UpdateWishlistDto> = useMemo(() => new WishlistBackend(), []);

    const cartService: ICartService<Cart> = useMemo(() => {
        return new LocalCartService(user?.login ?? '', cartBackend);
    }, [ user ]);

    const wishlistService: IWishlistService<Wishlist> = useMemo(() => {
        return new LocalWishlistService(user?.login ?? '', wishlistBackend);
    }, [ user ]);

    const productsService: IProductsService<Product> = useMemo(() => {
        return new LocalProductsService(new ProductsBackend());
    }, []);

    const authService: IAuthService<AuthData> = useMemo(() => {
        return new LocalAuthService(
            new UserBackend(),
            new UserBackendMapper(),
            cartBackend,
            wishlistBackend,
            new StorageService(localStorage, 'auth'),
            new StorageService(sessionStorage, 'auth'),
        );
    }, []);

    return (
        <ServicesContext.Provider value={ {
            wishlist: wishlistService,
            cart    : cartService,
            auth    : authService,
            products: productsService,
        } }>
            { props.children }
        </ServicesContext.Provider>
    );
};

export default ServicesProvider;