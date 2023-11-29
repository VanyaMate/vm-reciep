import { ICartService } from '@/modules/api/cart/cart-service.interface.ts';
import { Cart, CartItem } from '@/modules/api/cart/cart-service.types.ts';
import {
    CreateCartDto,
    UpdateCartDto,
} from '@/modules/local-backend/cart/cart-backend.types.ts';
import { ISingleService } from '@vanyamate/market-place-service';


export class LocalCartService implements ICartService<Cart> {
    constructor (
        private readonly _userId: string,
        private readonly _cartService: ISingleService<Cart, CreateCartDto, UpdateCartDto>,
    ) {
    }

    public async addToCart (productId: string, amount: number): Promise<Cart> {
        return this._updateCartAmount(productId, amount);
    }

    public async getMyCart (): Promise<Cart> {
        const cart: Cart | null = await this._cartService.read(this._userId);
        if (cart) {
            return cart;
        }

        throw 'Такой корзины не существует';
    }

    public removeFromCart (productId: string, amount: number): Promise<Cart> {
        return this._updateCartAmount(productId, -amount);
    }

    private async _updateCartAmount (productId: string, amount: number): Promise<Cart> {
        const cart: Cart | null = await this._cartService.read(this._userId);
        if (cart) {
            let updated: boolean = false;
            for (let i = 0; i < cart.items.length; i++) {
                const item: CartItem = cart.items[i];
                if (item.productId === productId) {
                    item.amount += amount;
                    updated = true;
                    break;
                }
            }

            if (!updated) {
                cart.items.push({ productId, amount });
            }

            return this._cartService.update(this._userId, cart);
        }

        throw 'Такой корзины не существует';
    }

    public async changeCartItem (productId: string, amount: number): Promise<Cart> {
        const cart: Cart | null = await this._cartService.read(this._userId);
        if (cart) {

            if (amount <= 0) {
                cart.items = cart.items.filter((item) => item.productId !== productId);
                return this._cartService.update(this._userId, cart);
            }

            let updated: boolean = false;
            for (let i = 0; i < cart.items.length; i++) {
                const item: CartItem = cart.items[i];
                if (item.productId === productId) {
                    item.amount = amount;
                    updated     = true;
                    break;
                }
            }

            if (!updated) {
                cart.items.push({ productId, amount });
            }

            return this._cartService.update(this._userId, cart);
        }

        throw 'Такой корзины не существует';
    }
}