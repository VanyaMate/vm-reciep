import React from 'react';


export type ReviewItemProps = {}

const ReviewItem: React.FC<ReviewItemProps> = (props) => {
    const {} = props;

    return (
        <div>
            ReviewItem component
        </div>
    );
};

export default React.memo(ReviewItem);