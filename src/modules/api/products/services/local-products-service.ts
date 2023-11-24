import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { IProductsService } from '@/modules/api/products/products-service.interface.ts';
import { IMultiplyService } from '@vanyamate/market-place-service';


export class LocalProductsService implements IProductsService<Product> {
    constructor (
        private readonly _productsService: IMultiplyService<Product>,
    ) {
    }

    public findMany (filter: Filter<Product>, options: Options<Product>): Promise<MultiplyResponse<Product>> {
        if (typeof filter === 'function') {
            return this._productsService.findManyByFilter(filter, options);
        } else {
            return this._productsService.findMany(filter, options);
        }
    }

    public findOne (id: string): Promise<Product | null> {
        return this._productsService.findOne(id);
    }
}