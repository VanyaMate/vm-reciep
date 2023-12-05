import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    ProductBackendDataGenerator,
} from '@/modules/local-backend/product/product-backend.data-generator.ts';
import {
    CreateProductDto,
    UpdateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';
import { SingleService, StorageService } from '@vanyamate/market-place-service';
import { LS_NAME__PRODUCT } from '@/modules/local-backend/storages.ts';


export class ProductBackend extends SingleService<Product, CreateProductDto, UpdateProductDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__PRODUCT,
            ),
            new ProductBackendDataGenerator(),
            {
                options: {
                    pk: 'barcode',
                },
            },
        );
    }
}