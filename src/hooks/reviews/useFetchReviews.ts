import { ReviewType } from '@/modules/api/review/review-service.interface.ts';
import {
    ReviewStatRatingItem,
} from '@/components/_review/Reviews/ReviewStat/ReviewStat.tsx';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { Review } from '@/modules/api/review/review-service.types.ts';
import { ReviewView } from '@/components/_review/Reviews/Reviews.tsx';
import { User } from '@/modules/api/user/user-service.types.ts';
import {
    getEndingByValue,
} from '@vanyamate/helpers/date/getEndingByValue/getEndingByValue';


export type UseFetchReviews = {
    loading: boolean;
    reviews: ReviewView[];
    stats: ReviewStatRatingItem[];
    count: number;
}

export const useFetchReviews = function (type: ReviewType, id: string): UseFetchReviews {
    const {
              reviews: reviewsService,
              users  : usersService,
          }                               = useContext(ServicesContext);
    const [ loading, setLoading ]         = useState<boolean>(false);
    const [ reviewsView, setReviewsView ] = useState<ReviewView[]>([]);
    const [ reviewStats, setReviewStats ] = useState<ReviewStatRatingItem[]>([]);
    const [ count, setCount ]             = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        setReviewsView([]);
        setReviewStats([]);
        setCount(0);

        let _count: number                       = 0;
        let _reviews: Review[]                   = [];
        let _reviewsView: ReviewView[]           = [];
        let _reviewsStat: ReviewStatRatingItem[] = [];

        reviewsService
            .findMany(type, { target: id }, { limit: 10 })
            .then((response) => {
                _count   = response.count;
                _reviews = response.list;
                return response.list;
            })
            .then((reviews) => {
                return reviews.reduce((acc, review) => acc.add(review.author), new Set<string>());
            })
            .then((logins) => {
                return usersService.findMany((user) => logins.has(user.login), { limit: logins.size });
            })
            .then((response) => {
                const users: { [key: string]: User } = {};
                response.list.forEach((user: User) => users[user.login] = user);
                return users;
            })
            .then((users) => {
                _reviewsView = _reviews.map((review) => ({
                    review: review, user: users[review.author],
                }));
            })
            .then(() => {
                return Promise.all([
                    reviewsService.findMany('product', {
                        rating: 1, target: id,
                    }, { limit: 0 }),
                    reviewsService.findMany('product', {
                        rating: 2, target: id,
                    }, { limit: 0 }),
                    reviewsService.findMany('product', {
                        rating: 3, target: id,
                    }, { limit: 0 }),
                    reviewsService.findMany('product', {
                        rating: 4, target: id,
                    }, { limit: 0 }),
                    reviewsService.findMany('product', {
                        rating: 5, target: id,
                    }, { limit: 0 }),
                ]);

            })
            .then((stats) => {
                _reviewsStat = stats.map((stat, index) => {
                    return {
                        label : getEndingByValue(index + 1, {
                            '1'    : 'звезда',
                            '2-4'  : 'звезды',
                            'other': 'звезд',
                        }, ''),
                        count : stat.count,
                        rating: index + 1,
                    };
                });
            })
            .finally(() => {
                setCount(_count);
                setReviewStats(_reviewsStat.reverse());
                setReviewsView(_reviewsView);
                setLoading(false);
            });
    }, [ type, id ]);


    return useMemo(() => {
        return {
            reviews: reviewsView,
            stats  : reviewStats,
            loading,
            count,
        };
    }, [ loading, reviewsView, reviewStats, count ]);
};