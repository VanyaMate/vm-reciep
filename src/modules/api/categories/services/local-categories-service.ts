import {
    ICategoriesService,
} from '@/modules/api/categories/categories-service.interface.ts';
import { Category } from '@/modules/api/category/category-service.types.ts';
import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';
import { IMultiplyService } from '@vanyamate/market-place-service';


export class LocalCategoriesService implements ICategoriesService<Category> {
    constructor (
        private readonly _categoriesService: IMultiplyService<Category>,
    ) {
    }

    public findMany (filter: Filter<Category>, options: Options<Category>): Promise<MultiplyResponse<Category>> {
        if (typeof filter === 'function') {
            return this._categoriesService.findManyByFilter(filter, options);
        } else {
            return this._categoriesService.findMany(filter, options);
        }
    }

    public findOne (id: string): Promise<Category | null> {
        return this._categoriesService.findOne(id);
    }
}