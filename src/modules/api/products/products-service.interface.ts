import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export interface IProductsService<ProductType> {
    findOne (id: string): Promise<ProductType | null>;

    findMany (filter: Filter<ProductType>, options: Options<ProductType>): Promise<MultiplyResponse<ProductType>>;
}