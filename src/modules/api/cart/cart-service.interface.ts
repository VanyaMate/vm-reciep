export interface ICartService<CartType> {
    addToCart (productId: string, amount: number): Promise<CartType>;

    removeFromCart (productId: string, amount: number): Promise<CartType>;

    changeCartItem (productId: string, amount: number): Promise<CartType>;

    getMyCart (): Promise<CartType>;
}