import React from 'react';
import { User } from '@/modules/api/user/user-service.types.ts';


export type UserHeaderProps = {
    user: User | null,
}

const UserHeader: React.FC<UserHeaderProps> = (props) => {
    const { user } = props;

    if (!user) {
        return (
            <div>
                Login
            </div>
        );
    }

    return (
        <div>
            Welcome, { user.login }
        </div>
    );
};

export default UserHeader;