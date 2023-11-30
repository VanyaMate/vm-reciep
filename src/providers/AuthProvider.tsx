import React, { useState } from 'react';
import { AuthContext } from '@/contexts/data/AuthContext.ts';


const AuthProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [ process, setProcess ] = useState<boolean>(true);

    return (
        <AuthContext.Provider value={ { process, setProcess } } { ...props }/>
    );
};

export default AuthProvider;