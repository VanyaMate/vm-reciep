import {
    ReviewStatRatingItem,
} from '@/components/_review/Reviews/ReviewStat/ReviewStat.tsx';
import { useMemo } from 'react';
import { isNaN } from 'formik';


export type UseReviewsRatingAcc = {
    amount: number;
    rating: number;
}

export const useReviewsRatingAcc = function (items: ReviewStatRatingItem[]): UseReviewsRatingAcc {
    return useMemo(() => {
        let amount: number = 0;
        let rating: number = 0;

        for (let i = 0; i < items.length; i++) {
            amount += items[i].count;
            rating += items[i].rating * items[i].count;
        }

        const finalRating: number = Number((rating / amount).toFixed(1));

        return {
            rating: isNaN(finalRating) ? 0 : finalRating,
            amount: amount,
        };
    }, [ items ]);
};