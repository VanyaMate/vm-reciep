import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';


export type HeaderUserProps = {
    user: User | null;
}

const HeaderUser: React.FC<HeaderUserProps> = (props) => {
    const { user } = props;

    return (
        <div>
            { user ? 'Welcome, ' + user.login : 'Login' }
        </div>
    );
};

export default HeaderUser;