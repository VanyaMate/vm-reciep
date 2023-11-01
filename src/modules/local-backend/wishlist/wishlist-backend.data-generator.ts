import { CreateWishlistDto, Wishlist } from '@/modules/api/wishlist/wishlist-service.types.ts';
import { IDataGenerator } from '@vanyamate/market-place-service';


export class WishlistBackendDataGenerator implements IDataGenerator<Wishlist, CreateWishlistDto> {
    private readonly _clearData: Wishlist = {
        items : [],
        userId: '',
    };

    public byData (data: CreateWishlistDto): Wishlist {
        return {
            ...this._clearData,
            ...data,
        };
    }

    public clear (): Wishlist {
        return { ...this._clearData };
    }

    public filled (data: CreateWishlistDto | undefined): Wishlist {
        return {
            items : this.items(),
            userId: this.userId(),
            ...data,
        };
    }

    public items (): Wishlist['items'] {
        return [];
    }

    public userId (): Wishlist['userId'] {
        return '';
    }

}