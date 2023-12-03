import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import { Category } from '@/modules/api/category/category-service.types.ts';
import categories
    from '@vanyamate/market-place-service/data/categories/categories.json';
import { LBSN_CATEGORY } from '@/modules/local-backend/storages.ts';


export class CategoriesBackend extends MultiplyService<Category> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LBSN_CATEGORY,
            ),
            {
                options: {
                    maxOperationsPerStep: 100,
                    findOneFilter       : (item, id) => item.title === id,
                    items               : categories,
                    timeout             : 120,
                },
            },
        );
    }
}