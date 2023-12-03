import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export interface IBrandsService<Brand> {
    findOne (id: string): Promise<Brand | null>;

    findMany (filter: Filter<Brand>, options: Options<Brand>): Promise<MultiplyResponse<Brand>>;
}