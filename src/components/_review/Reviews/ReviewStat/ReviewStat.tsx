import React from 'react';


export type ReviewStatRatingItem = {
    label: string;
    count: number;
}

export type ReviewStatType = {
    reviews: number;
    rating: ReviewStatRatingItem[];
}

export type ReviewStatProps = {
    stats: ReviewStatType;
}

const ReviewStat: React.FC<ReviewStatProps> = (props) => {
    const {} = props;

    return (
        <div>
            ReviewStat component
        </div>
    );
};

export default React.memo(ReviewStat);