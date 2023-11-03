import React, { useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext.ts';
import { User } from '@/modules/api/user/user-service.types.ts';


const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [ user, setUser ]       = useState<User | null>(null);
    const [ process, setProcess ] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={ {
            user, setUser,
            process, setProcess,
        } }>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;