import { MultiplyService, StorageService } from '@vanyamate/market-place-service';
import { Review } from '@/modules/api/review/review-service.types.ts';
import {
    LS_NAME__REVIEWS_BRAND,
} from '@/modules/local-backend/storages.ts';


export class ReviewsBrandBackend extends MultiplyService<Review> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__REVIEWS_BRAND,
            ),
            {
                options: {
                    timeout             : 120,
                    maxOperationsPerStep: 50,
                    findOneFilter       : (product, id) => product.id === id,
                },
            },
        );
    }
}