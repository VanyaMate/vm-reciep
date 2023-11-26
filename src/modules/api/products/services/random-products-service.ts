import {
    IProductsService,
} from '@/modules/api/products/products-service.interface.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';
import { IDataGenerator } from '@vanyamate/market-place-service';
import {
    CreateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';


export class RandomProductsService implements IProductsService<Product> {
    constructor (private readonly _generator: IDataGenerator<Product, CreateProductDto>) {
    }

    findMany (filter: Filter<Product>, options: Options<Product>): Promise<MultiplyResponse<Product>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const list: Product[] = [
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                    this._generator.filled(),
                ];

                resolve({
                    list,
                    count  : list.length,
                    options: {},
                });
            }, 100);
        });
    }

    findOne (id: string): Promise<Product | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this._generator.filled());
            }, 100);
        });
    }

}