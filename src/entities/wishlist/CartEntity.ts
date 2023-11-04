import { Entity, EntityEvents, IEntity } from '@vanyamate/lgc';
import { Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';


export type WishlistEvents = EntityEvents<{
    update: Wishlist;
    set: Wishlist | null;
}>;

export interface IWishlistEntity extends IEntity<WishlistEvents> {
    update (wishlist: Wishlist): void;

    set (wishlist: Wishlist | null): void;
}

export class WishlistEntity extends Entity<WishlistEvents> implements IWishlistEntity {
    private _wishlist: Wishlist | null = null;

    set (wishlist: Wishlist | null): void {
        this._executeWithProcess('set', async () => this._wishlist = wishlist);
    }

    update (wishlist: Wishlist): void {
        this._executeWithProcess('update', async () => this._wishlist = wishlist);
    }
}