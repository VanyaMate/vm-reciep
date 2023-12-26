import React, { useCallback, useMemo, useState } from 'react';
import { SendReviewMethod } from '@/hooks/reviews/useFetchSendReview.ts';
import Input from '@/components/_ui/_input/Input/Input.tsx';
import css from './ReviewForm.module.scss';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import { Rate } from 'antd';
import { ReviewType } from '@/modules/api/review/review-service.interface.ts';


export type ReviewFormProps = {
    id: string;
    onSend: SendReviewMethod;
}

const ReviewForm: React.FC<ReviewFormProps> = (props) => {
    const { onSend, id }          = props;
    const [ loading, setLoading ] = useState(false);
    const [ title, setTitle ]     = useState('');
    const [ body, setBody ]       = useState('');
    const [ rating, setRating ]   = useState(0);

    const filled = useMemo(() => {
        return title && body && rating;
    }, [ title, body, rating ]);

    const sendReview = useCallback(() => {
        setLoading(true);
        onSend({ rating, body, title, targetId: id })
            .finally(() => setLoading(false));
    }, [ filled, title, body, rating, id ]);

    return (
        <div className={ css.container }>
            <h2>Отставить отзыв</h2>
            <Rate value={ rating } onChange={ setRating }/>
            <Input
                block={ !filled }
                defaultValue={ title }
                placeholder={ 'Заголовок' }
                onValueChange={ setTitle }
            />
            <Input
                block={ !filled }
                defaultValue={ body }
                placeholder={ 'Отзыв' }
                onValueChange={ setBody }
            />
            <Button
                disabled={ !filled }
                styleType={ 'primary' }
                loading={ loading }
                onClick={ sendReview }
            >
                Отправить
            </Button>
        </div>
    );
};

export default React.memo(ReviewForm);