export type Wishlist = {
    userId: string;
    items: string[];
}

export type CreateWishlistDto = Pick<Wishlist, 'userId'>;
export type UpdateWishlistDto = Pick<Wishlist, 'items'>;