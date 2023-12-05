import { IReviewsService } from '@/modules/api/reviews/reviews-service.interface.ts';
import { Review } from '@/modules/api/review/review-service.types.ts';
import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { IMultiplyService } from '@vanyamate/market-place-service';


export class LocalReviewsService implements IReviewsService<Review> {
    constructor (private readonly _reviewsService: IMultiplyService<Review>) {

    }

    public findMany (filter: Filter<Review>, options: Options<Review>): Promise<MultiplyResponse<Review>> {
        if (typeof filter === 'function') {
            return this._reviewsService.findManyByFilter(filter, options);
        } else {
            return this._reviewsService.findMany(filter, options);
        }
    }

    public findOne (id: string): Promise<Review | null> {
        return this._reviewsService.findOne(id);
    }
}