import React from 'react';
import { Review } from '@/modules/api/review/review-service.types.ts';


export type ReviewItemProps = {
    review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = (props) => {
    const { review } = props;

    return (
        <div>
            <h2>{ review.title }</h2>
            <p>{ review.body }</p>
            <div style={{color: '#555'}}>{ review.author }</div>
        </div>
    );
};

export default React.memo(ReviewItem);