import React, { useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext.ts';


const AuthProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [ process, setProcess ] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={ { process, setProcess } } { ...props }/>
    );
};

export default AuthProvider;