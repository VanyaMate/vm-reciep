import { MultiplyService, StorageService } from '@vanyamate/market-place-service';
import { Review } from '@/modules/api/review/review-service.types.ts';
import { LS_NAME__REVIEWS_PRODUCT } from '@/modules/local-backend/storages.ts';


export class ReviewsProductBackend extends MultiplyService<Review> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__REVIEWS_PRODUCT,
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