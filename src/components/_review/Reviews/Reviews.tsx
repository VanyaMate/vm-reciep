import React, { useMemo } from 'react';
import { Review } from '@/modules/api/review/review-service.types.ts';
import ReviewStat, {
    ReviewStatRatingItem,
} from '@/components/_review/Reviews/ReviewStat/ReviewStat.tsx';
import ReviewForm from '@/components/_review/Reviews/ReviewForm/ReviewForm.tsx';
import { User } from '@/modules/api/user/user-service.types.ts';
import ReviewsList
    from '@/components/_review/Reviews/ReviewsList/ReviewsList.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './Reviews.module.scss';
import { SendReviewMethod } from '@/hooks/reviews/useFetchSendReview.ts';


export type ReviewView = {
    review: Review;
    user: User;
}

export type ReviewsProps = {
    id: string;
    loading?: boolean;
    authorized?: boolean;
    reviews: ReviewView[];
    additional: ReviewView[];
    stats: ReviewStatRatingItem[];
    onReview: SendReviewMethod;
}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const {
              loading, reviews, additional, stats, onReview, id, authorized,
          } = props;
    const allReviews: ReviewView[] = useMemo(() => {
        return [ ...additional.reverse(), ...reviews ];
    }, [ reviews, additional ]);

    return (
        <Box className={ css.container }>
            <div className={ css.left }>
                {
                    authorized
                    ? <ReviewForm onSend={ onReview } id={ id }/>
                    : <h2>pls login</h2>
                }
                <ReviewsList reviews={ allReviews }/>
            </div>
            <div className={ css.right }>
                <ReviewStat stats={ stats }/>
            </div>
        </Box>
    );
};

export default React.memo(Reviews);