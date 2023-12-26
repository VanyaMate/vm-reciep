import React from 'react';
import { ReviewView } from '@/components/_review/Reviews/Reviews.tsx';
import ReviewItem from '@/components/_review/Reviews/ReviewItem/ReviewItem.tsx';
import css from './ReviewsList.module.scss';


export type ReviewsListProps = {
    reviews: ReviewView[];
};

const ReviewsList: React.FC<ReviewsListProps> = (props) => {
    const { reviews } = props;

    return (
        <div className={ css.container }>
            {
                reviews.map((review) => (
                    <ReviewItem
                        key={ review.review.id }
                        review={ review.review }
                        user={ review.user }
                    />
                ))
            }
        </div>
    );
};

export default React.memo(ReviewsList);