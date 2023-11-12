import React, { useState } from 'react';
import { UserAuthContext } from '@/contexts/data/UserAuthContext.ts';
import { User } from '@/modules/api/user/user-service.types.ts';


const UserAuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [ user, setUser ]       = useState<User | null>(null);
    const [ process, setProcess ] = useState<boolean>(false);

    return (
        <UserAuthContext.Provider value={ {
            user, setUser,
            process, setProcess,
        } }>
            { props.children }
        </UserAuthContext.Provider>
    );
};

export default UserAuthProvider;