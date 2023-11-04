import React from 'react';
import BadgeButton from '@/components/_ui/_button/BadgeButton/BadgeButton.tsx';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Cart, CartItem } from '@/modules/api/cart/cart-service.types.ts';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type HeaderUserCartProps = {
    cart: CartItem[] | null;
}

const HeaderUserCart: React.FC<HeaderUserCartProps> = (props) => {
    const { cart } = props;

    return (
        cart && <Button
            amount={ cart.length }
            styleType={ cart.length ? 'primary' : 'default' }
            square
        >
            <ShoppingCartOutlined/>
        </Button>
    );
};

export default HeaderUserCart;