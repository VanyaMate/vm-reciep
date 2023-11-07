import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type HeaderUserCartProps = {
    cart: Cart | null;
}

const HeaderUserCart: React.FC<HeaderUserCartProps> = (props) => {
    const { cart } = props;

    return (
        cart && <Button
            amount={ cart.items.length }
            styleType={ cart.items.length ? 'primary' : 'default' }
            square
        >
            <ShoppingCartOutlined/>
        </Button>
    );
};

export default HeaderUserCart;