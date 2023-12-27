import React from 'react';
import { Review } from '@/modules/api/review/review-service.types.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import css from './ReviewItem.module.scss';
import ProductRatingWidget
    from '@/components/_product/ProductView/ProductHeaderNavigation/ProductRatingWidget/ProductRatingWidget.tsx';
import { useDeltaDate } from '@/hooks/date/useDeltaDate.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';


export type ReviewItemProps = {
    review: Review;
    user: User | null;
}

const ReviewItem: React.FC<ReviewItemProps> = (props) => {
    const { review, user } = props;
    const date             = useDeltaDate(review.date);

    return (
        <Box className={ css.container }>
            <div className={ css.top }>
                <div className={ css.user }>
                    {
                        user
                        ? <img className={ css.icon }
                               src={ user.avatar }
                               alt={ 'user avatar' }
                        />
                        : <div className={ css.icon }/>
                    }
                    <div className={ css.info }>
                        <div className={ css.name }>{ review.author }</div>
                        <ProductRatingWidget rating={ review.rating }/>
                    </div>
                </div>
                <div className={ css.date }>
                    { date }
                </div>
            </div>
            <div className={ css.review }>
                <h3 className={ css.title }>{ review.title }</h3>
                <p className={ css.body }>{ review.body }</p>
            </div>
        </Box>
    );
};

export default React.memo(ReviewItem);