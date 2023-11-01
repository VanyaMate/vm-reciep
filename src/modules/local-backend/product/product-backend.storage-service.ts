import { Product } from '@/modules/api/product/product-service.types.ts';
import { IStorageService } from '@vanyamate/market-place-service';


export class ProductStorageService implements IStorageService<Product> {
    constructor (
        private readonly _storageService: IStorageService<Product>,
        private readonly _products: Product[],
    ) {
    }

    public get (): Product[] {
        return [ ...this._products, ...this._storageService.get() ];
    }

    public set (items: Product[]): void {
        this._storageService.set(items);
    }
}