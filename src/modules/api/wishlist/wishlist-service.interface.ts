export interface IWishlistService<WishlistType> {
    getMyWishlist (): Promise<WishlistType>;

    addToWishlist (id: string): Promise<WishlistType>;

    removeFromWishlist (id: string): Promise<WishlistType>;
}