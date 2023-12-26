export type Review = {
    id: string;
    rating: number;
    target: string;
    title: string;
    body: string;
    author: string;
    redacted: boolean;
    date: string;
}

export type CreateReviewDto = Pick<Review, 'id' | 'target' | 'title' | 'body' | 'author' | 'date' | 'rating'>;
export type UpdateReviewDto = Partial<Omit<Review, 'id' | 'date' | 'redacted' | 'author'>>;