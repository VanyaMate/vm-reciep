import {
    IReviewsService,
} from '@/modules/api/reviews/reviews-service.interface.ts';
import { Review } from '@/modules/api/review/review-service.types.ts';
import { Filter, Options, MultiplyResponse } from '@/modules/api.types';
import { ReviewType } from '../../review/review-service.interface';
import { IMultiplyService } from '@vanyamate/market-place-service';


export class LocalReviewsService implements IReviewsService<Review> {
    constructor (
        private readonly _productReviewsBackend: IMultiplyService<Review>,
        private readonly _brandReviewsBackend: IMultiplyService<Review>,
        private readonly _companyReviewsBackend: IMultiplyService<Review>,
    ) {
    }

    findOne (type: ReviewType, id: string): Promise<Review | null> {
        switch (type) {
            case 'product':
                return this._productReviewsBackend.findOne(id);
            case 'brand':
                return this._brandReviewsBackend.findOne(id);
            default:
                return this._companyReviewsBackend.findOne(id);
        }
    }

    findMany (type: ReviewType, filter: Filter<Review>, options: Options<Review>): Promise<MultiplyResponse<Review>> {
        switch (type) {
            case 'product':
                if (typeof filter === 'function') {
                    return this._productReviewsBackend.findManyByFilter(filter, options);
                } else {
                    return this._productReviewsBackend.findMany(filter, options);
                }
            case 'brand':
                if (typeof filter === 'function') {
                    return this._brandReviewsBackend.findManyByFilter(filter, options);
                } else {
                    return this._brandReviewsBackend.findMany(filter, options);
                }
            default:
                if (typeof filter === 'function') {
                    return this._companyReviewsBackend.findManyByFilter(filter, options);
                } else {
                    return this._companyReviewsBackend.findMany(filter, options);
                }
        }
    }

}