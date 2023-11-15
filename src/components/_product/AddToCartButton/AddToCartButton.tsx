import React, { useCallback, useState } from 'react';
import Button, {
    ButtonProps,
} from '@/components/_ui/_button/Button/Button.tsx';


export type AddToCartButtonProps = {
    onAddToCart: () => Promise<any>;
    amount?: number;
} & ButtonProps;

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
    const { onAddToCart, styleType, ...other } = props;
    const [ loading, setLoading ]              = useState<boolean>(false);

    const onAddToCartHandler = useCallback(() => {
        setLoading(true);
        onAddToCart().finally(() => setLoading(false));
    }, [ onAddToCart ]);

    return (
        <Button
            styleType={ 'primary' }
            onClick={ onAddToCartHandler }
            { ...other }
        >
            Добавить в корзину
        </Button>
    );
};

export default AddToCartButton;