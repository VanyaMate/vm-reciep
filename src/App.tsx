import Header from '@/components/header/Header.tsx';
import {
    IProductsService,
} from '@/modules/api/products/products-service.interface.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { useEffect, useMemo, useState } from 'react';
import {
    LocalProductsService,
} from '@/modules/api/products/services/local-products-service.ts';
import {
    ProductsBackend,
} from '@/modules/local-backend/products/products-backend.ts';
import {
    ICategoriesService,
} from '@/modules/api/categories/categories-service.interface.ts';
import { Category } from '@/modules/api/category/category-service.types.ts';
import {
    LocalCategoriesService,
} from '@/modules/api/categories/services/local-categories-service.ts';
import {
    CategoriesBackend,
} from '@/modules/local-backend/categories/categories-backend.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import {
    LocalAuthService,
} from '@/modules/api/auth/services/local-auth-service.ts';
import { UserBackend } from '@/modules/local-backend/user/user-backend.ts';
import {
    UserBackendMapper,
} from '@/modules/local-backend/user/user-backend.mapper.ts';
import { CartBackend } from '@/modules/local-backend/cart/cart-backend.ts';
import {
    WishlistBackend,
} from '@/modules/local-backend/wishlist/wishlist-backend.ts';
import { StorageService } from '@vanyamate/market-place-service';
import Categories from '@/components/Categoties/Categories.tsx';
import UserHeader from '@/components/UserHeader/UserHeader.tsx';
import ProductCard from '@/components/ProductCard/ProductCard.tsx';
import AuthForm from '@/components/AuthForm/AuthForm.tsx';


const App = () => {
    const productsService: IProductsService<Product>      = useMemo(() => new LocalProductsService(new ProductsBackend()), []);
    const categoriesService: ICategoriesService<Category> = useMemo(() => new LocalCategoriesService(new CategoriesBackend()), []);
    const authService: IAuthService<AuthData>             = useMemo(() => new LocalAuthService(
        new UserBackend(),
        new UserBackendMapper(),
        new CartBackend(),
        new WishlistBackend(),
        new StorageService(localStorage, 'auth'),
        new StorageService(sessionStorage, 'auth'),
    ), []);


    const [ products, setProducts ]     = useState<Product[]>([]);
    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ user, setUser ]             = useState<User | null>(null);

    useEffect(() => {
        productsService
            .findMany({}, { limit: 30 })
            .then((response) => setProducts(response.list));

        categoriesService
            .findMany({}, { limit: 100 })
            .then((response) => setCategories(response.list));

        authService
            .refresh()
            .then((user) => setUser(user.user));
    }, []);

    return (
        <div>
            {
                user?.login || <AuthForm
                    onLogin={ (login, password, remember) => authService.login(login, password, remember).then((data) => setUser(data.user)) }
                    onRegistration={ (login, password, remember) => authService.registration(login, password, remember).then((data) => setUser(data.user)) }
                />
            }
            <Header
                categories={ <Categories categories={ categories }/> }
                user={ <UserHeader user={ user }
                                   logout={ () => authService.logout().then(() => setUser(null)) }/> }
            />
            <div style={ {
                display        : 'gap',
                gridAutoColumns: '1fr 1fr 1fr',
                gap            : 10,
            } }>
                {
                    products.map((product) =>
                        <ProductCard
                            key={ product.barcode }
                            product={ product }
                            addToCartButton={ <button>{ user?.login ? 'добавить'
                                                                    : 'войти' }</button> }
                        />,
                    )
                }
            </div>
        </div>
    );
};

export default App;