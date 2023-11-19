import React, { useCallback, useState } from 'react';
import Button, {
    ButtonProps,
} from '@/components/_ui/_button/Button/Button.tsx';
import { ICartController } from '@/hooks/useCart.ts';
import { useCartButton } from '@/hooks/components/useCartButtton.ts';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;


export type AddToCartButtonProps = {
    productId: string;
    cartController: ICartController;
} & ButtonProps;

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
    const { cartController, productId, styleType, ...other } = props;
    const {
              loading,
              inCart,
              onClick,
          }                                                  = useCartButton({
        productId,
        cartController,
    });

    return (
        <Button
            styleType={ 'primary' }
            onClick={ onClick }
            amount={ inCart }
            loading={ loading }
            { ...other }
        >
            Добавить в корзину
        </Button>
    );
};

export default React.memo(AddToCartButton);