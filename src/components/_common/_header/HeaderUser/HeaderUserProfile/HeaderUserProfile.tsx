import React, { useState } from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';
import css from './HeaderUserProfile.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { DownOutlined } from '@ant-design/icons';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import Dropdown from '@/components/_ui/_dropdown/Dropdown/Dropdown.tsx';
import HeaderUserProfileDropdown
    from '@/components/_common/_header/HeaderUser/HeaderUserProfile/HeaderUserProfileDropdown/HeaderUserProfileDropdown.tsx';


export type HeaderUserProfileProps = {
    user: User;
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = (props) => {
    const { user }    = props;
    const [ opened, setOpened ] = useState<boolean>(false);

    return (
        <div className={ css.dropdownContainer }>
            <Button
                className={ cn(css.container, opened && css.opened) }
                styleType={ 'second' }
                onClick={ () => setOpened((prev) => !prev) }
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
            <Dropdown opened={ opened } position={ 'bottom-left' }>
                <HeaderUserProfileDropdown user={ user }/>
            </Dropdown>
        </div>
    );
};

export default HeaderUserProfile;