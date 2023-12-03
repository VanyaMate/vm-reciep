import {
    CreateWishlistDto,
    UpdateWishlistDto,
    Wishlist,
} from '@/modules/api/wishlist/wishlist-service.types.ts';
import {
    WishlistBackendDataGenerator,
} from '@/modules/local-backend/wishlist/wishlist-backend.data-generator.ts';
import { SingleService, StorageService } from '@vanyamate/market-place-service';
import { LBSN_WISHLIST } from '@/modules/local-backend/storages.ts';


export class WishlistBackend extends SingleService<Wishlist, CreateWishlistDto, UpdateWishlistDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LBSN_WISHLIST,
            ),
            new WishlistBackendDataGenerator(),
            {
                options: {
                    pk: 'userId',
                },
            },
        );
    }
}