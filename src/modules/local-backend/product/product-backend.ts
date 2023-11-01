import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    ProductBackendDataGenerator,
} from '@/modules/local-backend/product/product-backend.data-generator.ts';
import {
    ProductStorageService,
} from '@/modules/local-backend/product/product-backend.storage-service.ts';
import {
    CreateProductDto,
    UpdateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';
import { SingleService, StorageService } from '@vanyamate/market-place-service';
import products_1 from '@vanyamate/market-place-service/data/products/products_1.json';
import products_2 from '@vanyamate/market-place-service/data/products/products_2.json';


export class ProductBackend extends SingleService<Product, CreateProductDto, UpdateProductDto> {
    constructor () {
        super(
            new ProductStorageService(
                new StorageService(
                    localStorage,
                    'products',
                ),
                [ ...products_1, ...products_2 ],
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