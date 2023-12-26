import React from 'react';
import { Review } from '@/modules/api/review/review-service.types.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import css from './ReviewItem.module.scss';
import ProductRatingWidget
    from '@/components/_product/ProductView/ProductHeaderNavigation/ProductRatingWidget/ProductRatingWidget.tsx';
import { useDeltaDate } from '@/hooks/date/useDeltaDate.ts';


export type ReviewItemProps = {
    review: Review;
    user: User;
}

const ReviewItem: React.FC<ReviewItemProps> = (props) => {
    const { review, user } = props;
    const date             = useDeltaDate(review.date);

    return (
        <div className={ css.container }>
            <div className={ css.top }>
                <div className={ css.user }>
                    <img className={ css.icon }
                         src={ user.avatar }
                         alt={ 'user avatar' }
                    />
                    <div className={ css.info }>
                        <div className={ css.name }>{ review.author }</div>
                        <ProductRatingWidget rating={ review.rating }/>
                    </div>
                </div>
                <div className={ css.date }>
                    { date }
                </div>
            </div>
            <p className={ css.review }>{ review.body }</p>
        </div>
    );
};

export default React.memo(ReviewItem);