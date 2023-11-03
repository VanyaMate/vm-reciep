import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';
import css from './HeaderUserProfile.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type HeaderUserProfileProps = {
    user: User | null;
    skeleton?: boolean;
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = (props) => {
    const { user, skeleton } = props;

    if (skeleton) {
        return (
            <div className={ cn(css.container, css.skeleton) }>
                <div className={ cn(css.avatar, 'gradient') }></div>
                <div className={ cn(css.name, 'gradient') }></div>
            </div>
        );
    }

    return (
        <div className={ css.container }>
            { user && <div className={ css.avatar }>
                <img src={ user.avatar }/>
            </div> }
            {
                user && <div className={ css.name }>{ user.login }</div>
            }
        </div>
    );
};

export default HeaderUserProfile;