import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    ProductStorageService,
} from '@/modules/local-backend/product/product-backend.storage-service.ts';
import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import products_1
    from '@vanyamate/market-place-service/data/products/products_1.json';
import products_2
    from '@vanyamate/market-place-service/data/products/products_2.json';
import { LS_NAME__PRODUCT } from '@/modules/local-backend/storages.ts';


export class ProductsBackend extends MultiplyService<Product> {
    constructor () {
        super(
            new ProductStorageService(
                new StorageService(
                    localStorage,
                    LS_NAME__PRODUCT,
                ),
                [ ...(products_1 as Product[]), ...(products_2 as Product[]) ],
            ),
            {
                options: {
                    maxOperationsPerStep: 20,
                    timeout             : 100,
                    findOneFilter       : (product: Product, id: string) => product.barcode.toString() === id,
                },
            },
        );
    }
}