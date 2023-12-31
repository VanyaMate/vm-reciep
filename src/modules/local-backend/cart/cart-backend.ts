import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import {
    CartBackendDataGenerator,
} from '@/modules/local-backend/cart/cart-backend.data-generator.ts';
import {
    CreateCartDto,
    UpdateCartDto,
} from '@/modules/local-backend/cart/cart-backend.types.ts';
import { SingleService, StorageService } from '@vanyamate/market-place-service';
import { LS_NAME__CART } from '@/modules/local-backend/storages.ts';


export class CartBackend extends SingleService<Cart, CreateCartDto, UpdateCartDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__CART,
            ),
            new CartBackendDataGenerator(),
            {
                options: {
                    pk     : 'userId',
                    timeout: 100,
                },
            },
        );
    }
}