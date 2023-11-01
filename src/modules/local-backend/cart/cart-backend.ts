import {
    CartBackendDataGenerator,
} from '@/modules/local-backend/cart/cart-backend.data-generator.ts';
import {
    Cart,
    CreateCartDto,
    UpdateCartDto,
} from '@/modules/local-backend/cart/cart-backend.types.ts';
import { SingleService, StorageService } from '@vanyamate/market-place-service';


export class CartBackend extends SingleService<Cart, CreateCartDto, UpdateCartDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                'carts',
            ),
            new CartBackendDataGenerator(),
            {
                options: {
                    pk: 'userId',
                },
            },
        );
    }
}