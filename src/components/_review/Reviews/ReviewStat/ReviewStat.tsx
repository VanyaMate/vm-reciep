import React from 'react';
import { useReviewsRatingAcc } from '@/hooks/reviews/useReviewsRatingAcc.ts';
import css from './ReviewStat.module.scss';
import ProductRatingWidget
    from '@/components/_product/ProductView/ProductHeaderNavigation/ProductRatingWidget/ProductRatingWidget.tsx';
import {
    useReviewsAmountPostfix,
} from '@/hooks/reviews/useReviewsAmountPostfix.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import { useReviewStatData } from '@/hooks/reviews/useReviewStatData.ts';
import ReviewStatListItems
    from '@/components/_review/Reviews/ReviewStat/ReviewStatListItems/ReviewStatListItems.tsx';


export type ReviewStatRatingItem = {
    label: string;
    rating: number;
    count: number;
}


export type ReviewStatProps = {
    stats: ReviewStatRatingItem[];
}

const ReviewStat: React.FC<ReviewStatProps> = (props) => {
    const { stats }           = props;
    const { rating, amount }  = useReviewsRatingAcc(stats);
    const list                = useReviewStatData(stats, {
        colorStart : { r: 0, g: 140, b: 255 },
        colorFinish: { r: 255, g: 136, b: 136 },
        amount,
    });
    const reviewsAmountString = useReviewsAmountPostfix(amount);

    return (
        <Box className={ css.container }>
            <div className={ css.ratingValue }>{ rating }</div>
            <div className={ css.reviews }>
                <ProductRatingWidget rating={ rating }/>
                <div>{ reviewsAmountString }</div>
            </div>
            <ReviewStatListItems list={ list }/>
        </Box>
    );
};

export default React.memo(ReviewStat);