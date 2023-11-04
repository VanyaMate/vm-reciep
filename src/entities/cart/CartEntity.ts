import { Entity, EntityEvents, IEntity } from '@vanyamate/lgc';
import { Cart, CartItem } from '@/modules/api/cart/cart-service.types.ts';


export type CartEvents = EntityEvents<{
    update: CartItem[];
    set: CartItem[] | null;
}>;

export interface ICartEntity extends IEntity<CartEvents> {
    update (cart: CartItem[]): void;

    set (cart: CartItem[] | null): void;
}

export class CartEntity extends Entity<CartEvents> implements ICartEntity {
    private _cart: CartItem[] | null = null;

    set (cart: CartItem[] | null): void {
        this._executeWithProcess('set', async () => this._cart = cart);
    }

    update (cart: CartItem[]): void {
        this._executeWithProcess('update', async () => this._cart = cart);
    }
}