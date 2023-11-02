import {
    ICategoryService,
} from '@/modules/api/category/category-service.interface.ts';
import {
    Category,
    CreateCategoryDto, UpdateCategoryDto,
} from '@/modules/api/category/category-service.types.ts';
import { ISingleService } from '@vanyamate/market-place-service';


export class LocalCategoryService implements ICategoryService<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor (
        private readonly _categoryService: ISingleService<Category, CreateCategoryDto, UpdateCategoryDto>,
    ) {
    }

    create (data: CreateCategoryDto): Promise<Category> {
        return this._categoryService.create(data);
    }

    delete (id: string): Promise<boolean> {
        return this._categoryService.delete(id);
    }

    read (id: string): Promise<Category | null> {
        return this._categoryService.read(id);
    }

    update (id: string, data: UpdateCategoryDto): Promise<Category> {
        return this._categoryService.update(id, data);
    }

}