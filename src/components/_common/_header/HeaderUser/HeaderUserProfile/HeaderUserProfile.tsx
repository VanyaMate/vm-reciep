import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';
import css from './HeaderUserProfile.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { DownOutlined } from '@ant-design/icons';
import Dropdown from '@/components/_ui/_dropdown/Dropdown/Dropdown.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type HeaderUserProfileProps = {
    user: User | null;
    skeleton?: boolean;
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = (props) => {
    const { user, skeleton } = props;

    if (skeleton) {
        return (
            <div className={ cn(css.container, css.skeleton) }>
                <div className={ css.info }>
                    <div className={ cn(css.avatar, 'gradient') }></div>
                    <div className={ cn(css.name, 'gradient') }></div>
                </div>
            </div>
        );
    }

    return (
        <Button
            className={ css.container }
            styleType={ 'second' }
        >
            <div className={ css.info }>
                {
                    user && <div className={ css.avatar }>
                        <img src={ user.avatar }/>
                    </div>
                }
                {
                    user && <div className={ css.name }>{ user.login }</div>
                }
            </div>
            <div className={ css.arrow }>
                <DownOutlined/>
            </div>
        </Button>
    );
};

export default HeaderUserProfile;