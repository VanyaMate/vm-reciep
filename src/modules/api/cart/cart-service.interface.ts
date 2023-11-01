export interface ICartService<CartType> {
    addToCart (productId: number, amount: number): Promise<CartType>;

    removeFromCart (productId: number, amount: number): Promise<CartType>;

    getMyCart (): Promise<CartType>;
}