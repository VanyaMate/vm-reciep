import React, { useCallback, useState } from 'react';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type AddToCartButtonProps = {
    onAddToCart: () => Promise<any>;
    amount?: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
    const { onAddToCart, amount } = props;
    const [ loading, setLoading ] = useState<boolean>(false);

    const onAddToCartHandler = useCallback(() => {
        setLoading(true);
        onAddToCart().finally(() => setLoading(false));
    }, [ onAddToCart ]);

    return (
        <Button
            styleType={ 'primary' }
            amount={ amount }
            onClick={ onAddToCartHandler }
            loading={ loading }
        >
            Добавить в корзину
        </Button>
    );
};

export default AddToCartButton;