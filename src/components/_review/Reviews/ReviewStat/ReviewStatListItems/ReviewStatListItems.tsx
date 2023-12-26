import React from 'react';
import { ReviewListItem } from '@/hooks/reviews/useReviewStatData.ts';
import css from './ReviewStatListItems.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type ReviewStatListItemsProps = {
    list: ReviewListItem[];
};

const ReviewStatListItems: React.FC<ReviewStatListItemsProps> = (props) => {
    const { list } = props;

    return (
        <div className={ css.container }>
            <div className={ css.labels }>
                {
                    list.map((item) => (
                        <div
                            className={ cn(css.label, css.row) }
                            key={ item.label }
                        >
                            { item.label }
                        </div>
                    ))
                }
            </div>
            <div className={ css.lines }>
                {
                    list.map((item) => (
                        <div key={ item.label } className={ css.row }>
                            <div className={ css.line }>
                                <div style={ {
                                    width          : item.percent + '%',
                                    backgroundColor: item.color,
                                } }
                                     className={ css.filled }
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default React.memo(ReviewStatListItems);