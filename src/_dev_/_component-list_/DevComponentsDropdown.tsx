import React, { useState } from 'react';
import DevComponentsItem from '@/_dev_/DevComponentsItem/DevComponentsItem.tsx';
import Dropdown from '@/components/_ui/_dropdown/DropdownList/DropdownList.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import {
    HeartOutlined,
    LogoutOutlined,
    SettingOutlined,
} from '@ant-design/icons';


const DevComponentsDropdown = () => {
    return (
        <DevComponentsItem
            label={ 'Dropdown' }
            type={ 'row' }
        >
            <Dropdown
                menuItems={ [
                    {
                        label: 'Настройки',
                        icon : <SettingOutlined/>,
                        type : 'default',
                    },
                    {
                        label: 'Перейти в профиль',
                        icon : <HeartOutlined/>,
                        type : 'default',
                    },
                    {
                        label  : 'Выйти',
                        icon   : <LogoutOutlined/>,
                        type   : 'danger',
                        onClick: () => {
                            console.log('logout');
                        },
                    },
                ] }
            >
                <Button styleType={ 'second' }>Профиль</Button>
            </Dropdown>
        </DevComponentsItem>
    );
};

export default DevComponentsDropdown;