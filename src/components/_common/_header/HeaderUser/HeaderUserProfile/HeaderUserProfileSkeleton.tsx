import React from 'react';
import { cn } from '@/helpers/classname.react.ts';
import css
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfile.module.scss';


const HeaderUserProfileSkeleton = () => {
    return (
        <div className={ cn(css.container, css.skeleton) }>
            <div className={ css.info }>
                <div className={ cn(css.avatar, 'gradient') }></div>
                <div className={ cn(css.name, 'gradient') }></div>
            </div>
        </div>
    );
};

export default HeaderUserProfileSkeleton;