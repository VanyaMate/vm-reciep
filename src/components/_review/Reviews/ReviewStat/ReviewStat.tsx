import React from 'react';


export type ReviewStatProps = {}

const ReviewStat: React.FC<ReviewStatProps> = (props) => {
    const {} = props;

    return (
        <div>
            ReviewStat component
        </div>
    );
};

export default React.memo(ReviewStat);