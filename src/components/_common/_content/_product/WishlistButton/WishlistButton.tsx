import React, { useCallback, useState } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import css from './WishlistButton.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type WishlistButtonProps = {
    showText?: boolean;
    onAddToWishlist: () => Promise<any>;
    inWishlist?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = (props) => {
    const { onAddToWishlist, showText, inWishlist } = props;
    const [ loading, setLoading ]                   = useState<boolean>(false);

    const onClick = useCallback(() => {
        setLoading(true);
        onAddToWishlist().finally(() => setLoading(false));
    }, [ onAddToWishlist ]);

    return (
        <div className={ cn(
            css.container,
            showText && css.show_text,
            loading && css.loading,
        ) }
             onClick={ onClick }
        >
            <HeartTwoTone className={ css.icon } twoToneColor={ inWishlist ? '#f55' : '#99b' }/>
            <span className={ css.text }>
                В избранное
            </span>
        </div>
    );
};

export default WishlistButton;