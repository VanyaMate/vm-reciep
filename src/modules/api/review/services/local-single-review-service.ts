import { ISingleReviewService } from '@/modules/api/review/single-review-service.interface.ts';
import {
    CreateReviewDto,
    Review,
    UpdateReviewDto,
} from '@/modules/api/review/review-service.types.ts';
import { ISingleService } from '@vanyamate/market-place-service';


export class LocalSingleReviewService implements ISingleReviewService<Review, CreateReviewDto, UpdateReviewDto> {
    constructor (private readonly _reviewService: ISingleService<Review, CreateReviewDto, UpdateReviewDto>) {
    }

    create (data: CreateReviewDto): Promise<Review> {
        return this._reviewService.create(data);
    }

    delete (id: string): Promise<boolean> {
        return this._reviewService.delete(id);
    }

    read (id: string): Promise<Review | null> {
        return this._reviewService.read(id);
    }

    update (id: string, data: UpdateReviewDto): Promise<Review> {
        return this._reviewService.update(id, data);
    }

}