import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';


export interface IProductsService {
    findOne (filter: Filter<Product>): Promise<Product>;

    findMany (filter: Filter<Product>, options: Options<Product>): Promise<MultiplyResponse<Product>>;
}