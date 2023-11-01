import {
    CreateWishlistDto,
    UpdateWishlistDto,
    Wishlist,
} from '@/modules/api/wishlist/wishlist-service.types.ts';
import {
    WishlistBackendDataGenerator,
} from '@/modules/local-backend/wishlist/wishlist-backend.data-generator.ts';
import { SingleService, StorageService } from '@vanyamate/market-place-service';


export class WishlistBackend extends SingleService<Wishlist, CreateWishlistDto, UpdateWishlistDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                'wishlist',
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