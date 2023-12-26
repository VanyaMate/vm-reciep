export type ReviewType =
    'product'
    | 'brand'
    | 'company';

export type ReviewData = {
    targetId: string;
    title: string;
    body: string;
    rating: number;
}

export interface IReviewService<Review> {
    send (type: ReviewType, data: ReviewData): Promise<Review>;

    update (type: ReviewType, reviewId: string, data: ReviewData): Promise<Review>;

    delete (type: ReviewType, reviewId: string): Promise<boolean>;
}