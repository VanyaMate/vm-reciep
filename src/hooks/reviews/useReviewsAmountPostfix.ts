import { useMemo } from 'react';
import {
    getEndingByValue,
} from '@vanyamate/helpers/date/getEndingByValue/getEndingByValue';


export const useReviewsAmountPostfix = function (reviews: number): string {
    return useMemo(() => {
        return getEndingByValue(reviews, {
            '1'    : 'отзыва',
            '2-4'  : 'отзыва',
            'other': 'отзывов',
        }, '');
    }, [ reviews ]);
};