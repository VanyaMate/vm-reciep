import { createContext } from 'react';
import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import {
    IProductsService,
} from '@/modules/api/products/products-service.interface.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { ICartService } from '@/modules/api/cart/cart-service.interface.ts';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import {
    IWishlistService,
} from '@/modules/api/wishlist/wishlist-service.interface.ts';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
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
import {
    LocalProductsService,
} from '@/modules/api/products/services/local-products-service.ts';
import {
    LocalCartService,
} from '@/modules/api/cart/services/local-cart-service.ts';
import {
    ProductsBackend,
} from '@/modules/local-backend/products/products-backend.ts';
import {
    LocalWishlistService,
} from '@/modules/api/wishlist/services/local-wishlist.service.ts';
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
    IBrandsService,
} from '@/modules/api/brands/brands-service.interface.ts';
import { Brand } from '@/modules/api/brand/brand-service.types.ts';
import {
    LocalBrandsService,
} from '@/modules/api/brands/services/local-brands-service.ts';
import {
    BrandsBackend,
} from '@/modules/local-backend/brands/brands-backend.ts';
import { STORAGE_NAME_AUTH } from '@/consts/storage-names.ts';
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
import {
    CreateReviewDto,
    Review, UpdateReviewDto,
} from '@/modules/api/review/review-service.types.ts';
import {
    LocalSingleReviewsService,
} from '@/modules/api/reviews/services/local-single-reviews-service.ts';
import {
    ReviewsProductBackend,
} from '@/modules/local-backend/reviews/reviews-product/reviews-product-backend.ts';
import {
    ReviewBrandBackend,
} from '@/modules/local-backend/review/review-brand/review-brand-backend.ts';
import {
    ReviewsCompanyBackend,
} from '@/modules/local-backend/reviews/reviews-company/reviews-company-backend.ts';
import {
    ReviewsBrandBackend,
} from '@/modules/local-backend/reviews/reviews-brand/reviews-brand-backend.ts';
import {
    LocalSingleReviewService,
} from '@/modules/api/review/services/local-single-review-service.ts';
import {
    ReviewProductBackend,
} from '@/modules/local-backend/review/review-product/review-product-backend.ts';
import {
    ISingleReviewService,
} from '@/modules/api/review/single-review-service.interface.ts';
import {
    IReviewService,
} from '@/modules/api/review/review-service.interface.ts';
import {
    IReviewsService,
} from '@/modules/api/reviews/reviews-service.interface.ts';
import {
    LocalReviewsService,
} from '@/modules/api/reviews/services/local-reviews-service.ts';
import {
    LocalReviewService,
} from '@/modules/api/review/services/local-review-service.ts';
import {
    ReviewCompanyBackend,
} from '@/modules/local-backend/review/review-company/review-company-backend.ts';


export type ServicesContextType = {
    auth: IAuthService<AuthData>,
    products: IProductsService<Product>,
    cart: ICartService<Cart>,
    wishlist: IWishlistService<Wishlist>,
    categories: ICategoriesService<Category>,
    brand: IBrandsService<Brand>,
    company: ICompaniesService<Company>,
    reviews: IReviewsService<Review>,
    review: IReviewService<Review>,
}

export const ServicesContext = createContext<ServicesContextType>({
    auth      : new LocalAuthService(
        new UserBackend(),
        new UserBackendMapper(),
        new CartBackend(),
        new WishlistBackend(),
        new StorageService(localStorage, STORAGE_NAME_AUTH),
        new StorageService(sessionStorage, STORAGE_NAME_AUTH),
    ),
    products  : new LocalProductsService(new ProductsBackend()),
    cart      : new LocalCartService('', new CartBackend()),
    wishlist  : new LocalWishlistService('', new WishlistBackend()),
    categories: new LocalCategoriesService(new CategoriesBackend()),
    brand     : new LocalBrandsService(new BrandsBackend()),
    company   : new LocalCompaniesService(new CompaniesBackend()),
    reviews   : new LocalReviewsService(
        new ReviewsProductBackend(),
        new ReviewsBrandBackend(),
        new ReviewsCompanyBackend(),
    ),
    review    : new LocalReviewService(
        '',
        new ReviewProductBackend(),
        new ReviewBrandBackend(),
        new ReviewCompanyBackend(),
    ),
});