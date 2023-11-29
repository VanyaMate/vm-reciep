import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type HeaderUserCartProps = {
    cart: Cart;
    onClick: () => any;
}

const HeaderUserCart: React.FC<HeaderUserCartProps> = (props) => {
    const { cart, onClick } = props;

    return (
        <Button
            amount={ cart.items.length }
            styleType={ cart.items.length ? 'primary' : 'default' }
            onClick={ onClick }
            square
        >
            <ShoppingCartOutlined/>
        </Button>
    );
};

export default React.memo(HeaderUserCart);