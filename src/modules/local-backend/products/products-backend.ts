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


export class ProductsBackend extends MultiplyService<Product> {
    constructor () {
        super(
            new ProductStorageService(
                new StorageService(
                    localStorage,
                    'products',
                ),
                [ ...products_1, ...products_2 ],
            ),
            {
                options: {
                    maxOperationsPerStep: 100,
                    timeout             : 120,
                    findOneFilter       : (product: Product, id: string) => product.barcode.toString() === id,
                },
            },
        );
    }
}