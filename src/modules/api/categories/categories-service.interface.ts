import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export interface ICategoriesService<CategoryType> {
    findOne (id: string): Promise<CategoryType | null>;

    findMany (filter: Filter<CategoryType>, options: Options<CategoryType>): Promise<MultiplyResponse<CategoryType>>;
}