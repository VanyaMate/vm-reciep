import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    ProductBackendDataGenerator,
} from '@/modules/local-backend/product/product-backend.data-generator.ts';
import {
    CreateProductDto,
    UpdateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';
import { SingleService, StorageService } from '@vanyamate/market-place-service';


export class ProductBackend extends SingleService<Product, CreateProductDto, UpdateProductDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                'products',
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