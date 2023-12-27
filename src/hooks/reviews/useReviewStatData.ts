import {
    ReviewStatRatingItem,
} from '@/components/_review/Reviews/ReviewStat/ReviewStat.tsx';
import { useMemo } from 'react';
import {
    ColorRGB,
    getColorRGBInterpolate,
} from '@/helpers/color-interpolator.ts';


export type ReviewListItem = {
    color: string;
    percent: number;
    label: string;
}

export type UseReviewStatDataOptions = {
    colorStart: ColorRGB;
    colorFinish: ColorRGB;
    amount: number;
}

export const useReviewStatData = function (data: ReviewStatRatingItem[], options: UseReviewStatDataOptions): ReviewListItem[] {
    return useMemo(() => {
        const list: ReviewListItem[] = [];

        for (let i = 0; i < data.length; i++) {
            list.push({
                color  : getColorRGBInterpolate(options.colorFinish, options.colorStart, i, data.length - 1),
                label  : data[i].label,
                percent: 100 / options.amount * data[i].count,
            });
        }

        return list;
    }, [ data, options ]);
};