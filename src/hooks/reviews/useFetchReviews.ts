import { ReviewType } from '@/modules/api/review/review-service.interface.ts';
import {
    ReviewStatRatingItem,
} from '@/components/_review/Reviews/ReviewStat/ReviewStat.tsx';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Review } from '@/modules/api/review/review-service.types.ts';
import { ReviewView } from '@/components/_review/Reviews/Reviews.tsx';
import {
    UserBackendDataGenerator,
} from '@/modules/local-backend/user/user-backend.data-generator.ts';


export type UseFetchReviews = {
    loading: boolean;
    reviews: ReviewView[];
}

export const useFetchReviews = function (type: ReviewType, id: string): UseFetchReviews {
    const { reviews: reviewsService }     = useContext(ServicesContext);
    const [ loading, setLoading ]         = useState<boolean>(false);
    const [ reviews, setReviews ]         = useState<Review[]>([]);
    const [ reviewsView, setReviewsView ] = useState<ReviewView[]>([]);
    const userGenerator                   = new UserBackendDataGenerator();

    useEffect(() => {
        setLoading(true);
        setReviews([]);
        reviewsService
            .findMany(type, { target: id }, { limit: 10 })
            .then((response) => setReviews(response.list));
    }, [ type, id ]);

    useEffect(() => {
        setLoading(true);
        setReviewsView([]);
        if (!reviews.length) {
            setLoading(false);
            return;
        }

        // TODO: Тут надо изменить после создания сервиса пользоватей. Чтобы искать по пользователям
        setReviewsView(reviews.map((review) => ({
            review: review, user: userGenerator.filled(undefined),
        })));
        setLoading(false);
    }, [ reviews ]);

    return useMemo(() => {
        return {
            reviews: reviewsView,
            loading,
        };
    }, [ loading, reviewsView ]);
};