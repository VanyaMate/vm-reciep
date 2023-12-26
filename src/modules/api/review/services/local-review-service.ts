import {
    IReviewService, ReviewData, ReviewType,
} from '@/modules/api/review/review-service.interface.ts';
import {
    CreateReviewDto,
    Review, UpdateReviewDto,
} from '@/modules/api/review/review-service.types.ts';
import { ISingleService } from '@vanyamate/market-place-service';


export class LocalReviewService implements IReviewService<Review> {
    constructor (
        private readonly _userId: string,
        private readonly _productReviewBackend: ISingleService<Review, CreateReviewDto, UpdateReviewDto>,
        private readonly _brandReviewBackend: ISingleService<Review, CreateReviewDto, UpdateReviewDto>,
        private readonly _companyReviewBackend: ISingleService<Review, CreateReviewDto, UpdateReviewDto>,
    ) {
    }

    async send (type: ReviewType, data: ReviewData): Promise<Review> {
        if (!this._userId) {
            throw new Error('No auth');
        }

        const createDto: CreateReviewDto = {
            id    : Date.now().toString() + Math.random().toString(),
            title : data.title,
            body  : data.body,
            date  : new Date().toString(),
            author: this._userId,
            target: data.targetId,
            rating: data.rating,
        };

        switch (type) {
            case 'product':
                return this._productReviewBackend.create(createDto);
            case 'brand':
                return this._brandReviewBackend.create(createDto);
            default:
                return this._companyReviewBackend.create(createDto);
        }
    }

    async update (type: ReviewType, reviewId: string, data: ReviewData): Promise<Review> {
        if (!this._userId) {
            throw new Error('No auth');
        }

        const updateDto: UpdateReviewDto = {
            title : data.title,
            body  : data.body,
            target: data.targetId,
            rating: data.rating,
        };

        switch (type) {
            case 'product':
                return this._productReviewBackend.update(reviewId, updateDto);
            case 'brand':
                return this._brandReviewBackend.update(reviewId, updateDto);
            default:
                return this._companyReviewBackend.update(reviewId, updateDto);
        }
    }

    async delete (type: ReviewType, reviewId: string): Promise<boolean> {
        if (!this._userId) {
            throw new Error('No auth');
        }

        switch (type) {
            case 'product':
                return this._productReviewBackend.delete(reviewId);
            case 'brand':
                return this._brandReviewBackend.delete(reviewId);
            default:
                return this._companyReviewBackend.delete(reviewId);
        }
    }
}
