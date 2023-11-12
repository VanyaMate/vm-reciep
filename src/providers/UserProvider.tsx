import React, { useState } from 'react';
import { UserContext } from '@/contexts/data/UserContext.ts';
import { User } from '@/modules/api/user/user-service.types.ts';


const UserProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [ user, setUser ] = useState<User | null>(null);

    return (
        <UserContext.Provider value={ { user, setUser } } { ...props }/>
    );
};

export default UserProvider;