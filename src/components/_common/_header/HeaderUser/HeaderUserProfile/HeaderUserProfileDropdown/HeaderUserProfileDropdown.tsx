import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';
import css from './HeaderUserProfileDropdown.module.scss';
import IconListItem
    from '@/components/_ui/_container/IconListItem/IconListItem.tsx';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';


export type HeaderUserProfileDropdownProps = {
    user: User;
}

const HeaderUserProfileDropdown: React.FC<HeaderUserProfileDropdownProps> = (props) => {
    const { user } = props;

    return (
        <div className={ css.container }>
            <IconListItem
                icon={ <SettingOutlined/> }
                label={ 'Настройки' }
            />
            <IconListItem
                icon={ <LogoutOutlined/> }
                label={ 'Выйти' }
                styleType={ 'danger' }
            />
        </div>
    );
};

export default HeaderUserProfileDropdown;