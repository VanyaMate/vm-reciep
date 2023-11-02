import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';


export type UserHeaderProps = {
    user: User | null,
    logout: () => Promise<any>;
}

const UserHeader: React.FC<UserHeaderProps> = (props) => {
    const { user, logout } = props;

    if (!user) {
        return (
            <div>
                Login
            </div>
        );
    }

    return (
        <div>
            Welcome, { user.login } <span onClick={ logout }>[logout]</span>
        </div>
    );
};

export default UserHeader;