export interface ISingleReviewService<Review, CreateReviewDto, UpdateReviewDto> {
    create (data: CreateReviewDto): Promise<Review>;

    update (id: string, data: UpdateReviewDto): Promise<Review>;

    delete (id: string): Promise<boolean>;

    read (id: string): Promise<Review | null>;
}