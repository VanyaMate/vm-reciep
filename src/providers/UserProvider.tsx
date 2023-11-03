import React, { useState } from 'react';
import { UserContext } from '@/contexts/UserContext.ts';
import { User } from '@/modules/api/user/user-service.types.ts';


const UserProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [ user, setUser ] = useState<User | null>(null);

    return (
        <UserContext.Provider value={ user }>
            { props.children }
        </UserContext.Provider>
    );
};

export default UserProvider;