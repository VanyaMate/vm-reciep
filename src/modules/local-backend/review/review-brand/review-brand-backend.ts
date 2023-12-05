import { SingleService, StorageService } from '@vanyamate/market-place-service';
import {
    CreateReviewDto,
    Review,
    UpdateReviewDto,
} from '@/modules/api/review/review-service.types.ts';
import { LS_NAME__REVIEWS_BRAND } from '@/modules/local-backend/storages.ts';
import {
    ReviewBackendDataGenerator,
} from '@/modules/local-backend/review/review-backend.data-generator.ts';


export class ReviewBrandBackend extends SingleService<Review, CreateReviewDto, UpdateReviewDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__REVIEWS_BRAND,
            ),
            new ReviewBackendDataGenerator(),
            {
                options: {
                    pk     : 'id',
                    timeout: 100,
                },
            },
        );
    }
}