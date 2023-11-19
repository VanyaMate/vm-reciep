import React from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import css from './WishlistButton.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { IWishlistController } from '@/hooks/useWishlist.ts';
import { useWishlistButton } from '@/hooks/components/useWishlistButton.ts';


export type WishlistButtonProps = {
    showText?: boolean;
    productId: string;
    className?: string;
    wishlistController: IWishlistController;
}

const WishlistButton: React.FC<WishlistButtonProps> = (props) => {
    const {
              wishlistController,
              productId,
              showText,
              className,
          }                                = props;
    const { loading, inWishlist, onClick } = useWishlistButton({
        productId,
        wishlistController,
    });

    return (
        <div className={ cn(
            css.container,
            showText && css.show_text,
            loading && css.loading,
            className,
        ) }
             onClick={ onClick }
        >
            <HeartTwoTone className={ css.icon }
                          twoToneColor={ inWishlist ? '#f55' : '#99b' }/>
            <span className={ css.text }>
                { inWishlist ? 'В избранном' : 'В избранное' }
            </span>
        </div>
    );
};

export default React.memo(WishlistButton);