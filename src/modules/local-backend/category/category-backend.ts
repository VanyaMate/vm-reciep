import { SingleService, StorageService } from '@vanyamate/market-place-service';
import {
    Category,
    CreateCategoryDto,
    UpdateCategoryDto,
} from '@/modules/api/category/category-service.types.ts';
import {
    CategoryBackendDataGenerator,
} from '@/modules/local-backend/category/category-backend.data-generator.ts';


export class CategoryBackend extends SingleService<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                'category',
            ),
            new CategoryBackendDataGenerator(),
            {
                options: {
                    pk: 'title',
                },
            },
        );
    }
}