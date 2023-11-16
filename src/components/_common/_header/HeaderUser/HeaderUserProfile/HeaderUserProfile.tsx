import React, { useMemo, useState } from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';
import css from './HeaderUserProfile.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { DownOutlined } from '@ant-design/icons';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import Dropdown, {
    DropdownListItem,
} from '@/components/_ui/_dropdown/DropdownList/DropdownList.tsx';
import HeaderUserProfileDropdown
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfileDropdown/HeaderUserProfileDropdown.tsx';


export type HeaderUserProfileProps = {
    user: User;
    menuItems: DropdownListItem[];
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = (props) => {
    const { user, menuItems } = props;

    return (
        <Dropdown
            menuItems={ menuItems }
            full
        >
            <Button
                className={ cn(css.container) }
                styleType={ 'second' }
            >
                {
                    user &&
                    <div className={ css.info }>
                        <div className={ css.avatar }>
                            <img src={ user.avatar }/>
                        </div>
                        <div className={ css.name }>{ user.login }</div>
                    </div>
                }
                <div className={ css.arrow }>
                    <DownOutlined/>
                </div>
            </Button>
        </Dropdown>
    );
};

export default HeaderUserProfile;