import {
    IReviewsService,
} from '@/modules/api/reviews/reviews-service.interface.ts';
import {
    CreateReviewDto,
    Review,
} from '@/modules/api/review/review-service.types.ts';
import { Filter, Options, MultiplyResponse } from '@/modules/api.types';
import { ReviewType } from '../../review/review-service.interface';
import { IDataGenerator } from '@vanyamate/market-place-service';
import { getRandomInt } from '@/helpers/random.ts';


export class LocalRandomReviewsService implements IReviewsService<Review> {
    constructor (
        private readonly _reviewGenerator: IDataGenerator<Review, CreateReviewDto>,
    ) {
    }

    async findOne (type: ReviewType, id: string): Promise<Review | null> {
        return this._reviewGenerator.filled(undefined);
    }

    async findMany (type: ReviewType, filter: Filter<Review>, options: Options<Review>): Promise<MultiplyResponse<Review>> {
        return {
            count  : options.limit || getRandomInt(5, 30),
            options: options,
            list   : [
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
                this._reviewGenerator.filled(),
            ],
        };
    }

}