export type CartItem = {
    productId: string;
    amount: number;
}

export type Cart = {
    userId: string;
    items: CartItem[];
}