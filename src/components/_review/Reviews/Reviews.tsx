import React from 'react';


export type ReviewsProps = {}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const {} = props;

    return (
        <div>
            Reviews component
        </div>
    );
};

export default React.memo(Reviews);