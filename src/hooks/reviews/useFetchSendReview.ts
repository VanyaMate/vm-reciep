import {
    Review,
} from '@/modules/api/review/review-service.types.ts';
import { useCallback, useContext, useMemo } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { ReviewData } from '@/modules/api/review/review-service.interface.ts';


export type SendReviewMethod = (data: ReviewData) => Promise<Review>;

export type UseFetchSendReview = {
    send: SendReviewMethod;
}

export const useFetchSendReview = function (): UseFetchSendReview {
    const services                     = useContext(ServicesContext);
    const sendMethod: SendReviewMethod = useCallback((data: ReviewData) => {
        return new Promise(() => {
        });
    }, [ services ]);
    return useMemo(() => {
        return { send: sendMethod };
    }, [ sendMethod ]);
};