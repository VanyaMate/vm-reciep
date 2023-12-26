import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';
import { ReviewType } from '@/modules/api/review/review-service.interface.ts';


export interface IReviewsService<Review> {
    findOne (type: ReviewType, id: string): Promise<Review | null>;

    findMany (type: ReviewType, filter: Filter<Review>, options: Options<Review>): Promise<MultiplyResponse<Review>>;
}