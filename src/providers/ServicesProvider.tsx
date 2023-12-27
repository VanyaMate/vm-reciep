import React, { useContext, useMemo } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
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
import {
    RandomProductsService,
} from '@/modules/api/products/services/random-products-service.ts';
import {
    ProductBackendDataGenerator,
} from '@/modules/local-backend/product/product-backend.data-generator.ts';
import { STORAGE_NAME_AUTH } from '@/consts/storage-names.ts';
import {
    IBrandsService,
} from '@/modules/api/brands/brands-service.interface.ts';
import { Brand } from '@/modules/api/brand/brand-service.types.ts';
import {
    LocalBrandsService,
} from '@/modules/api/brands/services/local-brands-service.ts';
import {
    BrandsBackend,
} from '@/modules/local-backend/brands/brands-backend.ts';
import {
    ICompaniesService,
} from '@/modules/api/companies/companies-service.interface.ts';
import { Company } from '@/modules/api/company/company-service.types.ts';
import {
    LocalCompaniesService,
} from '@/modules/api/companies/services/local-companies-service.ts';
import {
    CompaniesBackend,
} from '@/modules/local-backend/companies/companies-backend.ts';
import {
    ISingleReviewsService,
} from '@/modules/api/reviews/single-reviews-service.interface.ts';
import { Review } from '@/modules/api/review/review-service.types.ts';
import {
    LocalSingleReviewsService,
} from '@/modules/api/reviews/services/local-single-reviews-service.ts';
import {
    ReviewsProductBackend,
} from '@/modules/local-backend/reviews/reviews-product/reviews-product-backend.ts';
import {
    ReviewsBrandBackend,
} from '@/modules/local-backend/reviews/reviews-brand/reviews-brand-backend.ts';
import {
    ReviewsCompanyBackend,
} from '@/modules/local-backend/reviews/reviews-company/reviews-company-backend.ts';
import {
    LocalReviewsService,
} from '@/modules/api/reviews/services/local-reviews-service.ts';
import {
    LocalReviewService,
} from '@/modules/api/review/services/local-review-service.ts';
import {
    ReviewProductBackend,
} from '@/modules/local-backend/review/review-product/review-product-backend.ts';
import {
    ReviewBrandBackend,
} from '@/modules/local-backend/review/review-brand/review-brand-backend.ts';
import {
    ReviewCompanyBackend,
} from '@/modules/local-backend/review/review-company/review-company-backend.ts';
import {
    IReviewsService,
} from '@/modules/api/reviews/reviews-service.interface.ts';
import ReviewItem from '@/components/_review/Reviews/ReviewItem/ReviewItem.tsx';
import {
    IReviewService,
} from '@/modules/api/review/review-service.interface.ts';
import { IUsersService } from '@/modules/api/users/users-service.interface.ts';
import {
    LocalUsersService,
} from '@/modules/api/users/services/local-users-service.ts';
import { UsersBackend } from '@/modules/local-backend/users/users-backend.ts';
import {
    LocalRandomReviewsService,
} from '@/modules/api/reviews/services/local-random-reviews-service.ts';
import {
    ReviewBackendDataGenerator,
} from '@/modules/local-backend/review/review-backend.data-generator.ts';


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
        // return new RandomProductsService(new ProductBackendDataGenerator());
    }, []);

    const categoriesService: ICategoriesService<Category> = useMemo(() => {
        return new LocalCategoriesService(new CategoriesBackend());
    }, []);

    const brandsService: IBrandsService<Brand> = useMemo(() => {
        return new LocalBrandsService(new BrandsBackend());
    }, []);

    const companiesService: ICompaniesService<Company> = useMemo(() => {
        return new LocalCompaniesService(new CompaniesBackend());
    }, []);

    const reviewsService: IReviewsService<Review> = useMemo(() => {
        return new LocalRandomReviewsService(new ReviewBackendDataGenerator());

        // TODO: Либо оставить рандомный сервис, либо этот, но добавить сюда рандомных тоже, чтобы не было пусто..
        return new LocalReviewsService(
            new ReviewsProductBackend(),
            new ReviewsBrandBackend(),
            new ReviewsCompanyBackend(),
        );
    }, []);

    const reviewService: IReviewService<Review> = useMemo(() => new LocalReviewService(
        user?.login ?? '',
        new ReviewProductBackend(),
        new ReviewBrandBackend(),
        new ReviewCompanyBackend(),
    ), [ user ]);

    const authService: IAuthService<AuthData> = useMemo(() => {
        return new LocalAuthService(
            new UserBackend(),
            new UserBackendMapper(),
            cartBackend,
            wishlistBackend,
            new StorageService(localStorage, STORAGE_NAME_AUTH),
            new StorageService(sessionStorage, STORAGE_NAME_AUTH),
        );
    }, []);

    const usersService: IUsersService<User> = useMemo(() => {
        return new LocalUsersService(
            new UsersBackend(),
            new UserBackendMapper(),
        );
    }, []);

    return (
        <ServicesContext.Provider value={ {
            wishlist  : wishlistService,
            users     : usersService,
            cart      : cartService,
            auth      : authService,
            products  : productsService,
            categories: categoriesService,
            brand     : brandsService,
            company   : companiesService,
            review    : reviewService,
            reviews   : reviewsService,
        } }>
            { props.children }
        </ServicesContext.Provider>
    );
};

export default ServicesProvider;