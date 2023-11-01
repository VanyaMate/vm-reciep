import { IWishlistService } from '@/modules/api/wishlist/wishlist-service.interface.ts';
import {
    CreateWishlistDto,
    UpdateWishlistDto,
    Wishlist,
} from '@/modules/api/wishlist/wishlist-service.types.ts';
import { SingleService } from '@vanyamate/market-place-service';


export class LocalWishlistService implements IWishlistService<Wishlist> {
    constructor (
        private readonly _userId: string,
        private readonly _wishlistService: SingleService<Wishlist, CreateWishlistDto, UpdateWishlistDto>,
    ) {
    }

    public async addToWishlist (id: string): Promise<Wishlist> {
        const wishlist: Wishlist | null = await this._wishlistService.read(this._userId);
        if (wishlist) {
            wishlist.items = [ ...new Set(...wishlist.items).add(id) ];
            return await this._wishlistService.update(this._userId, wishlist);
        }

        throw 'Такого списка избранного не существует';
    }

    public async getMyWishlist (): Promise<Wishlist> {
        const wishlist: Wishlist | null = await this._wishlistService.read(this._userId);
        if (wishlist) {
            return wishlist;
        }

        throw 'Такого списка избранного не существует';
    }

    public async removeFromWishlist (id: string): Promise<Wishlist> {
        const wishlist: Wishlist | null = await this._wishlistService.read(this._userId);
        if (wishlist) {
            wishlist.items = wishlist.items.filter((item) => item !== id);
            return await this._wishlistService.update(this._userId, wishlist);
        }

        throw 'Такого списка избранного не существует';
    }

}