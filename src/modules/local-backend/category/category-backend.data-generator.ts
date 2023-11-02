import { IDataGenerator } from '@vanyamate/market-place-service';
import {
    Category,
    CreateCategoryDto,
} from '@/modules/api/category/category-service.types.ts';


export class CategoryBackendDataGenerator implements IDataGenerator<Category, CreateCategoryDto> {
    private readonly _clearData: Category = {
        description  : '',
        image        : '',
        subcategories: [],
        parent       : '',
        title        : '',
    };

    byData (data: CreateCategoryDto): Category {
        return {
            ...this._clearData,
            ...data,
        };
    }

    clear (): Category {
        return { ...this._clearData };
    }

    filled (data: CreateCategoryDto | undefined): Category {
        return {
            title        : this.title(),
            parent       : this.parent(),
            subcategories: this.subcategories(),
            description  : this.description(),
            image        : this.image(),
            ...data,
        };
    }

    parent (): Category['parent'] {
        return '';
    }

    title (): Category['title'] {
        return '';
    }

    description (): Category['description'] {
        return '';
    }

    image (): Category['image'] {
        return '';
    }

    subcategories (): Category['subcategories'] {
        return [];
    }

}