import React from 'react';
import BadgeButton from '@/components/_ui/_button/BadgeButton/BadgeButton.tsx';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';


export type HeaderUserCartProps = {
    cart: Cart | null;
}

const HeaderUserCart: React.FC<HeaderUserCartProps> = (props) => {
    const { cart } = props;

    return (
        cart && <BadgeButton
            amount={ cart.items.length }
            icon={ <ShoppingCartOutlined/> }
        />
    );
};

export default HeaderUserCart;