import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export interface IReviewsService<Review> {
    findOne (id: string): Promise<Review | null>;

    findMany (filter: Filter<Review>, options: Options<Review>): Promise<MultiplyResponse<Review>>;
}