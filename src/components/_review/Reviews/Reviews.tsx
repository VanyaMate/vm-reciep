import React from 'react';
import { Review } from '@/modules/api/review/review-service.types.ts';
import ReviewStat, {
    ReviewStatProps,
    ReviewStatType,
} from '@/components/_review/Reviews/ReviewStat/ReviewStat.tsx';
import ReviewForm from '@/components/_review/Reviews/ReviewForm/ReviewForm.tsx';
import ReviewItem from '@/components/_review/Reviews/ReviewItem/ReviewItem.tsx';


export type ReviewsProps = {
    loading?: boolean;
    reviews: Review[];
    stats: ReviewStatType;
}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const { loading, reviews, stats } = props;

    return (
        <div>
            <ReviewForm/>
            <ReviewStat stats={ stats }/>
            {
                reviews.map((review) => (
                    <ReviewItem key={ review.id } review={ review }/>
                ))
            }
        </div>
    );
};

export default React.memo(Reviews);